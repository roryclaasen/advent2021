import { toNumber, uniqWith } from 'lodash';

import AdventCommand from '../../base';
import { Point } from '../../types';
import { parseFile, splitLines } from '../../utils';

type Input = {
    points: Point[];
    folds: Point[];
};

export default class Day13Challenge extends AdventCommand<Input, number, string> {
    static aliases = ['day:13'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const [points, folds] = data.split('\n\n').map(splitLines);

        return {
            points: points.map((line) => {
                const [x, y] = line.split(',').map(toNumber);
                return { x, y } as Point;
            }),
            folds: folds.map((line) => {
                const match = line.match(/^fold along (x|y)=(\d+)$/);
                const axis = match[1] as 'x' | 'y';
                const pos = toNumber(match[2]);
                return {
                    x: axis === 'x' ? pos : 0,
                    y: axis === 'y' ? pos : 0
                } as Point;
            })
        };
    }

    private fold(points: Point[], fold: Point): Point[] {
        const foldedPoints = points.map((p) => ({
            x: fold.x && p.x > fold.x ? p.x - (p.x - fold.x) * 2 : p.x,
            y: fold.y && p.y > fold.y ? p.y - (p.y - fold.y) * 2 : p.y
        }));

        return uniqWith(foldedPoints, (a, b) => a.x === b.x && a.y === b.y);
    }

    private render(points: Point[]): string {
        const width = Math.max(...points.map((p) => p.x)) + 1;
        const height = Math.max(...points.map((p) => p.y)) + 1;
        const image = Array.from({ length: height })
            .fill(0)
            .map(() => Array.from({ length: width }).fill('░'));
        for (const p of points) image[p.y][p.x] = '▓';

        return image.map((line) => line.join('')).join('\n');
    }

    protected part1({ points, folds }: Input): number {
        return this.fold(points, folds[0]).length;
    }

    protected part2({ points, folds }: Input): string {
        for (const fold of folds) {
            points = this.fold(points, fold);
        }

        return this.render(points);
    }
}
