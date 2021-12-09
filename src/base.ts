import cli from 'cli-ux';
import { cloneDeep } from 'lodash';

import { Command, Flags } from '@oclif/core';

type ComputeAnswer<T> = {
    part: number;
    answer: T;
};

export default abstract class AdventCommand<TInput = string[], TAnswer = number> extends Command {
    protected abstract parseInput(test: boolean): Promise<TInput>;

    protected abstract part1(input: TInput): TAnswer;

    protected abstract part2(input: TInput): TAnswer;

    private async compute(test: boolean, part: number): Promise<ComputeAnswer<TAnswer>[]> {
        const input = await this.parseInput(test);

        const answers: ComputeAnswer<TAnswer>[] = [];

        switch (part) {
            case 1: {
                answers.push({ part: 1, answer: this.part1(input) });
                break;
            }

            case 2: {
                answers.push({ part: 2, answer: this.part2(input) });
                break;
            }

            default: {
                const input2 = cloneDeep(input);
                answers.push({ part: 1, answer: this.part1(input) }, { part: 2, answer: this.part2(input2) });
                break;
            }
        }

        return answers;
    }

    public static flags = {
        part: Flags.integer({ char: 'p', description: 'Part to run', options: ['1', '2'] }),
        test: Flags.boolean({ char: 't', description: 'Run using test data' })
    };

    public async run(): Promise<void> {
        try {
            cli.action.start('Processing challenge');

            const { flags } = await this.parse(AdventCommand);
            const result = await this.compute(flags.test, flags.part);

            cli.action.stop();

            for (const { part, answer } of result) {
                this.log(`Part ${part} Answer: ${answer}`);
            }
        } catch (error) {
            cli.action.stop('failed');
            if (error instanceof Error || typeof error === 'string') {
                cli.error(error);
            } else {
                cli.error('Unknown error occurred');
            }
        }
    }
}
