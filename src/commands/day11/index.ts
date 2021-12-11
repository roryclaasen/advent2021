import { toNumber } from 'lodash';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Octopus = {
    energy: number;
    flashed: boolean;
};

type Input = Octopus[][];

export default class Day11Challenge extends AdventCommand<Input> {
    static aliases = ['day:11'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data).map((line) => [...line].map(toNumber).map((n) => ({ energy: n, flashed: false })));
    }

    private updateNeiboghors(input: Input, x: number, y: number): void {
        if (x > 0) input[y][x - 1].energy++;
        if (x < input[y].length - 1) input[y][x + 1].energy++;
        if (y > 0) input[y - 1][x].energy++;
        if (y < input.length - 1) input[y + 1][x].energy++;

        if (x > 0 && y > 0) input[y - 1][x - 1].energy++;
        if (x < input[y].length - 1 && y > 0) input[y - 1][x + 1].energy++;
        if (x > 0 && y < input.length - 1) input[y + 1][x - 1].energy++;
        if (x < input[y].length - 1 && y < input.length - 1) input[y + 1][x + 1].energy++;
    }

    protected part1(input: Input): number {
        let flashes = 0;
        for (let i = 0; i < 100; i++) {
            for (const row of input) for (const oct of row) oct.energy++;

            do {
                for (let y = 0; y < input.length; y++) {
                    for (let x = 0; x < input[y].length; x++) {
                        const octopus = input[y][x];
                        // eslint-disable-next-line max-depth
                        if (octopus.energy > 9 && !octopus.flashed) {
                            flashes++;
                            this.updateNeiboghors(input, x, y);
                            octopus.flashed = true;
                        }
                    }
                }
            } while (input.flat().some((oct) => oct.energy > 9 && !oct.flashed));

            for (const row of input) {
                for (const oct of row) {
                    if (oct.energy > 9) {
                        oct.energy = 0;
                        oct.flashed = false;
                    }
                }
            }
        }

        return flashes;
    }

    protected part2(input: Input): number {
        let step = 0;
        do {
            for (const row of input) {
                for (const oct of row) {
                    if (oct.energy > 9) {
                        oct.energy = 0;
                        oct.flashed = false;
                    }
                }
            }

            step++;
            for (const row of input) for (const oct of row) oct.energy++;

            do {
                for (let y = 0; y < input.length; y++) {
                    for (let x = 0; x < input[y].length; x++) {
                        const octopus = input[y][x];
                        // eslint-disable-next-line max-depth
                        if (octopus.energy > 9 && !octopus.flashed) {
                            this.updateNeiboghors(input, x, y);
                            octopus.flashed = true;
                        }
                    }
                }
            } while (input.flat().some((oct) => oct.energy > 9 && !oct.flashed));
        } while (input.flat().some((oct) => !oct.flashed));

        return step;
    }
}
