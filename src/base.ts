import cli from 'cli-ux';
import { cloneDeep } from 'lodash';
import { performance } from 'perf_hooks';

import { Command, Flags } from '@oclif/core';

type ComputeAnswer<T> = {
    part: number;
    answer: T;
};

export default abstract class AdventCommand<TInput = string[], TAnswer = number> extends Command {
    protected abstract parseInput(test: boolean): Promise<TInput>;

    protected abstract part1(input: TInput): TAnswer;

    protected abstract part2(input: TInput): TAnswer;

    private computeAnswer(part: number, task: () => TAnswer): ComputeAnswer<TAnswer> {
        cli.action.start(`Processing part ${part}`, '', { stdout: true });
        const start = performance.now();
        const answer = task();
        const end = performance.now();
        cli.action.stop('done. Took ' + (end - start).toFixed(2) + 'ms');

        return { part, answer };
    }

    private async compute(test: boolean, part: number): Promise<ComputeAnswer<TAnswer>[]> {
        cli.action.start(`Reading input`, '', { stdout: true });
        const input = await this.parseInput(test);
        cli.action.stop();

        const answers: ComputeAnswer<TAnswer>[] = [];

        switch (part) {
            case 1: {
                answers.push(this.computeAnswer(1, () => this.part1(input)));
                break;
            }

            case 2: {
                answers.push(this.computeAnswer(2, () => this.part2(input)));
                break;
            }

            default: {
                const input2 = cloneDeep(input);
                answers.push(
                    this.computeAnswer(1, () => this.part1(input)),
                    this.computeAnswer(2, () => this.part2(input2))
                );
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
            const { flags } = await this.parse(AdventCommand);
            const result = await this.compute(flags.test, flags.part);

            this.log('');
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
