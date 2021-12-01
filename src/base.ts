import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

export default abstract class AdventCommand<TAnswer = string> extends Command {
    protected abstract compute(): Promise<TAnswer>;

    public async run() {
        cli.action.start('Processing challenge');
        try {
            const result = await this.compute();
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
        this.log(`The answer is: ${answer}`);
    }
}
