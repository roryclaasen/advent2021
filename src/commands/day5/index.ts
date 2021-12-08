import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Point = {
    x: number;
    y: number;
};

type Line = {
    from: Point;
    to: Point;
};

type Input = Line[];

export default class Day5Challenge extends AdventCommand<Input> {
    static aliases = ['day:5'];

    protected async parseInput(test: boolean): Promise<Input> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        return splitLines(data).map((line) => {
            const [from, to] = line.split(' -> ');
            const [fromX, fromY] = from.split(',').map(toNumber);
            const [toX, toY] = to.split(',').map(toNumber);
            return {
                from: { x: fromX, y: fromY },
                to: { x: toX, y: toY }
            } as Line;
        });
    }

    private makeGrid(input: Input): number[][] {
        let maxX = 0;
        let maxY = 0;

        for (const line of input) {
            maxX = Math.max(maxX, line.from.x, line.to.x);
            maxY = Math.max(maxY, line.from.y, line.to.y);
        }

        const grid: number[][] = [];
        for (let y = 0; y <= maxY; y++) {
            grid[y] = [];
            for (let x = 0; x <= maxX; x++) {
                grid[y][x] = 0;
            }
        }

        return grid;
    }

    protected part1(input: Input): number {
        return this.part2(input.filter((line) => line.from.x === line.to.x || line.from.y === line.to.y));
    }

    protected part2(input: Input): number {
        const grid = this.makeGrid(input);

        for (const line of input) {
            const dir: Point = {
                x: line.from.x === line.to.x ? 0 : line.from.x < line.to.x ? 1 : -1,
                y: line.from.y === line.to.y ? 0 : line.from.y < line.to.y ? 1 : -1
            };

            const curr: Point = {
                x: line.from.x,
                y: line.from.y
            };

            grid[curr.y][curr.x]++;
            while (curr.x !== line.to.x || curr.y !== line.to.y) {
                curr.x += dir.x;
                curr.y += dir.y;
                grid[curr.y][curr.x]++;
            }
        }

        return grid.flat().filter((i) => i > 1).length;
    }
}
