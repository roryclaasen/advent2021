import { cli } from 'cli-ux';
import { cloneDeep } from 'lodash';
import { performance } from 'perf_hooks';

import { Command, Flags } from '@oclif/core';

type ComputeAnswer<T> = {
    part: number;
    answer: T;
};

export default abstract class AdventCommand<TInput = string[], TAnswer1 = number, TAnswer2 = TAnswer1> extends Command {
    protected abstract parseInput(test: boolean): Promise<TInput>;

    protected abstract part1(input: TInput): TAnswer1 | Promise<TAnswer1>;

    protected abstract part2(input: TInput): TAnswer2 | Promise<TAnswer2>;

    private async computeAnswer(part: number, task: () => TAnswer1 | TAnswer2 | Promise<TAnswer1 | TAnswer2>): Promise<ComputeAnswer<TAnswer1 | TAnswer2>> {
        cli.action.start(`Processing part ${part}`, '', { stdout: true });
        const start = performance.now();

        let answer = task();
        if (answer instanceof Promise) {
            answer = await answer;
        }

        const end = performance.now();
        const duration = end - start;
        cli.action.stop('done. Took ' + (duration > 1000 ? (duration / 1000).toFixed(2) + 's' : duration.toFixed(2) + 'ms'));

        return { part, answer };
    }

    private async compute(test: boolean, part: number): Promise<ComputeAnswer<TAnswer1 | TAnswer2>[]> {
        cli.action.start(`Reading input`, '', { stdout: true });
        const start = performance.now();
        const input = await this.parseInput(test);
        const end = performance.now();
        const duration = end - start;
        cli.action.stop('done. Took ' + (duration > 1000 ? (duration / 1000).toFixed(2) + 's' : duration.toFixed(2) + 'ms'));

        const answers: ComputeAnswer<TAnswer1 | TAnswer2>[] = [];

        switch (part) {
            case 1: {
                const part1 = await this.computeAnswer(1, () => this.part1(input));
                answers.push(part1);
                break;
            }

            case 2: {
                const part2 = await this.computeAnswer(2, () => this.part2(input));
                answers.push(part2);
                break;
            }

            default: {
                const input2 = cloneDeep(input);
                const part1 = await this.computeAnswer(1, () => this.part1(input));
                const part2 = await this.computeAnswer(2, () => this.part2(input2));
                answers.push(part1, part2);
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
                if (typeof answer === 'string') {
                    if (answer.includes('\n')) {
                        this.log(`Part ${part} Answer: \n${answer}`);
                        continue;
                    }
                }

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
