import { sum, toNumber } from 'lodash';

import AdventCommand from '../../base';
import { parseFile, splitLines, stringify } from '../../utils';

type Point = { x: number; y: number };
type Input = number[][];

export default class Day9Challenge extends AdventCommand<Input> {
    static aliases = ['day:9'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data).map((line) => [...line].map(toNumber));
    }

    private findLowPoints(input: Input): Point[] {
        const points: Point[] = [];
        for (let y = 0; y < input.length; y++) {
            for (let x = 0; x < input[y].length; x++) {
                const height = input[y][x];
                if (y - 1 >= 0 && height >= input[y - 1][x]) {
                    continue;
                }

                if (y + 1 < input.length && height >= input[y + 1][x]) {
                    continue;
                }

                if (x - 1 >= 0 && height >= input[y][x - 1]) {
                    continue;
                }

                if (x + 1 < input[y].length && height >= input[y][x + 1]) {
                    continue;
                }

                points.push({ x, y });
            }
        }

        return points;
    }

    protected part1(input: Input): number {
        return sum(this.findLowPoints(input).map((point) => input[point.y][point.x] + 1));
    }

    private findArea(input: Input, point: Point, included: Map<string, boolean> = new Map<string, boolean>()): Map<string, boolean> {
        if (included.has(stringify(point))) {
            return included;
        }

        if (point.y < 0 || point.y >= input.length) {
            return included;
        }

        if (point.x < 0 || point.x >= input[point.y].length) {
            return included;
        }

        if (input[point.y][point.x] === 9) {
            return included;
        }

        included.set(stringify(point), true);

        if (!included.has(stringify({ x: point.x, y: point.y - 1 }))) {
            included = this.findArea(input, { x: point.x, y: point.y - 1 }, included);
        }

        if (!included.has(stringify({ x: point.x, y: point.y + 1 }))) {
            included = this.findArea(input, { x: point.x, y: point.y + 1 }, included);
        }

        if (!included.has(stringify({ x: point.x - 1, y: point.y }))) {
            included = this.findArea(input, { x: point.x - 1, y: point.y }, included);
        }

        if (!included.has(stringify({ x: point.x + 1, y: point.y }))) {
            included = this.findArea(input, { x: point.x + 1, y: point.y }, included);
        }

        return included;
    }

    protected part2(input: Input): number {
        const lowPoints = this.findLowPoints(input);
        const areas = lowPoints.map((point) => this.findArea(input, point).size).sort((a, b) => b - a);
        return areas[0] * areas[1] * areas[2];
    }
}
