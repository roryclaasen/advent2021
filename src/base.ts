import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

export default abstract class AdventCommand<TAnswer = [number, number]> extends Command {
    protected abstract compute(test: boolean): Promise<TAnswer>;

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

    protected logAnswer(answer: TAnswer) {
        if (Array.isArray(answer)) {
            for (const [i, value] of answer.entries()) {
                this.log(`Part ${i + 1} Answer: ${value}`);
            }
        } else {
            this.log(`The answer is: ${answer}`);
        }
    }
}
