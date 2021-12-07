import cli from 'cli-ux';
import { cloneDeep } from 'lodash';

import { Command, flags } from '@oclif/command';

export default abstract class AdventCommand<TInput = string[], TAnswer = number> extends Command {
    protected abstract parseInput(test: boolean): Promise<TInput>;

    protected abstract part1(input: TInput): TAnswer;

    protected abstract part2(input: TInput): TAnswer;

    protected async compute(test: boolean): Promise<[TAnswer, TAnswer]> {
        const part1Input = await this.parseInput(test);
        const part2Input = cloneDeep(part1Input);

        const part1 = this.part1(part1Input);
        const part2 = this.part2(part2Input);

        return [part1, part2];
    }

    static flags = {
        test: flags.boolean({ char: 't', description: 'run using test data' })
    };

    public async run() {
        const { flags } = this.parse(AdventCommand);

        cli.action.start('Processing challenge');
        try {
            const result = await this.compute(flags.test);
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

    protected logAnswer(answer: [TAnswer, TAnswer]) {
        for (const [i, value] of answer.entries()) {
            this.log(`Part ${i + 1} Answer: ${value}`);
        }
    }
}
