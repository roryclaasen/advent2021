import { toNumber } from 'lodash';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Input = number[];

export default class Day1Challenge extends AdventCommand<Input> {
    static aliases = ['day:1'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data).map(toNumber);
    }

    protected part1(input: Input): number {
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

    protected part2(input: Input): number {
        const slidingInputs: number[] = [];

        for (let i = 0; i < input.length - 2; i++) {
            const measurement = input[i] + input[i + 1] + input[i + 2];
            slidingInputs.push(measurement);
        }

        return this.part1(slidingInputs);
    }
}
