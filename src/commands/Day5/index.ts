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

export default class Day5Challenge extends AdventCommand {
    private async parseInput(test: boolean): Promise<Line[]> {
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

    private makeGrid(test: boolean) {
        const size = test ? 10 : 1000;
        const grid: number[][] = [];
        for (let i = 0; i < size; i++) {
            grid.push([]);
            for (let j = 0; j < size; j++) {
                grid[i].push(0);
            }
        }

        return grid;
    }

    private part1(test: boolean, input: Line[]): number {
        return this.part2(
            test,
            input.filter((line) => line.from.x === line.to.x || line.from.y === line.to.y)
        );
    }

    private part2(test: boolean, input: Line[]): number {
        const grid = this.makeGrid(test);

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

    protected async compute(test: boolean): Promise<[number, number]> {
        const input = await this.parseInput(test);

        const part1 = this.part1(test, input);
        const part2 = this.part2(test, input);

        return [part1, part2];
    }
}
