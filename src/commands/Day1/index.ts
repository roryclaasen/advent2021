import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

export default class Day1Challenge extends AdventCommand {
    static aliases = ['day1', 'day:1'];

    private async parseInput(test: boolean): Promise<number[]> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        return splitLines(data).map(toNumber);
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
        const slidingInputs: number[] = [];

        for (let i = 0; i < input.length - 2; i++) {
            const measurement = input[i] + input[i + 1] + input[i + 2];
            slidingInputs.push(measurement);
        }

        return this.part1(slidingInputs);
    }

    protected async compute(test: boolean): Promise<[number, number]> {
        const input = await this.parseInput(test);

        const part1 = this.part1(input);
        const part2 = this.part2(input);

        return [part1, part2];
    }
}
