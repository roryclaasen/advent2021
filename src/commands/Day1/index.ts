import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

export default class Day0 extends AdventCommand<[number, number]> {
    public static description = 'This is my Advent of Code attempt for day 1';

    private async parseInput(): Promise<number[]> {
        return await parseFile(path.resolve(__dirname, 'input'))
            .then(splitLines)
            .then((lines) => lines.map(toNumber));
    }

    private part1(input: number[]): number {
        let lastMeasurement: number | undefined;
        let noIncrements = 0;

        for (const measurement of input) {
            if (lastMeasurement !== undefined) {
                if (lastMeasurement < measurement) {
                    noIncrements++;
                }
            }

            lastMeasurement = measurement;
        }

        return noIncrements;
    }

    private part2(input: number[]): number {
        let slidingInputs: number[] = [];

        for(let i = 0; i < input.length - 2; i++) {
            let measurement = input[i] + input[i + 1] + input[i + 2];
            slidingInputs.push(measurement)
        }

        return this.part1(slidingInputs);
    }

    protected async compute(): Promise<[number, number]> {
        const input = await this.parseInput();

        const part1 = this.part1(input);
        const part2 = this.part2(input);

        return [part1, part2];
    }
}
