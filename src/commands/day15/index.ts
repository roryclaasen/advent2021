import { toNumber } from 'lodash';

import AdventCommand from '~shared/advent-command';
import { parseFile, splitLines } from '~shared/file';
import ObjectMap from '~shared/map/object-map';
import { getNeighbors, Point } from '~shared/point';
import { priorityQueue } from '~shared/priority-queue';

type Input = {
    riskMap: ObjectMap<Point, number>;
    size: Point;
};

export default class Day15Challenge extends AdventCommand<Input> {
    static aliases = ['day:15'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const grid = splitLines(data).map((line) => [...line].map(toNumber));
        const riskMap = new ObjectMap<Point, number>();
        for (const [y, row] of grid.entries()) {
            for (const [x, risk] of row.entries()) {
                riskMap.set({ x, y }, risk);
            }
        }

        return {
            riskMap,
            size: { x: grid[0].length, y: grid.length }
        };
    }

    protected part1({ riskMap, size }: Input): number {
        const topLeft: Point = { x: 0, y: 0 };
        const bottomRight: Point = { x: size.x - 1, y: size.y - 1 };

        const queue = priorityQueue<Point>();
        const totalRiskMap = new ObjectMap<Point, number>();

        totalRiskMap.set(topLeft, 0);
        queue.insert(topLeft, 0);

        while (!queue.isEmpty()) {
            const p = queue.pop();

            for (const n of getNeighbors(p)) {
                if (riskMap.has(n) && !totalRiskMap.has(n)) {
                    const totalRisk = totalRiskMap.get(p) + riskMap.get(n);
                    totalRiskMap.set(n, totalRisk);

                    if (n.x === bottomRight.x && n.y === bottomRight.y) {
                        break;
                    }

                    queue.insert(n, totalRisk);
                }
            }
        }

        return totalRiskMap.get(bottomRight);
    }

    protected part2({ riskMap: input, size }: Input): number {
        const res = new ObjectMap<Point, number>();
        for (let y = 0; y < size.y * 5; y++) {
            for (let x = 0; x < size.x * 5; x++) {
                const risk = input.get({ x: x % size.x, y: y % size.y });
                const distance = Math.floor(y / size.y) + Math.floor(x / size.x);
                const riskLevel = ((risk + distance - 1) % 9) + 1;
                res.set({ x, y }, riskLevel);
            }
        }

        return this.part1({
            riskMap: res,
            size: { x: size.x * 5, y: size.y * 5 }
        });
    }
}
