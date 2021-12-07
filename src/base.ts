import cli from 'cli-ux';
import { cloneDeep } from 'lodash';

import { Command, flags } from '@oclif/command';

type Answer<T> = {
    part: number;
    answer: T;
};

export default abstract class AdventCommand<TInput = string[], TAnswer = number> extends Command {
    protected abstract parseInput(test: boolean): Promise<TInput>;

    protected abstract part1(input: TInput): TAnswer;

    protected abstract part2(input: TInput): TAnswer;

    private async compute(test: boolean, part: number): Promise<Answer<TAnswer>[]> {
        const input = await this.parseInput(test);

        const answers: Answer<TAnswer>[] = [];

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
        part: flags.integer({ char: 'p', description: 'Part to run', options: ['1', '2'] }),
        test: flags.boolean({ char: 't', description: 'Run using test data' })
    };

    public async run() {
        const { flags } = this.parse(AdventCommand);

        cli.action.start('Processing challenge');
        try {
            const result = await this.compute(flags.test, flags.part);
            cli.action.stop();
            this.logAnswer(result);
        } catch (error) {
            cli.action.stop('failed');
            if (error instanceof Error || typeof error === 'string') {
                cli.error(error);
            } else {
                cli.error('Unknown error occurred');
            }
        }
    }

    private logAnswer(answer: Answer<TAnswer>[]) {
        for (const [, value] of answer.entries()) {
            this.log(`Part ${value.part} Answer: ${value.answer}`);
        }
    }
}
