import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

export default abstract class AdventCommand<R = string> extends Command {

    public static examples = [
        `$ @roryclaasen/advent2021 ${this.constructor.name}
The answer is: 12345
`,
    ];

    protected abstract compute(): Promise<R>;

    public async run() {
        cli.action.start('Processing task')
        const result = await this.compute();
        cli.action.stop();
        this.showResult(result);
    }

    protected showResult(result: R) {
        this.log(`The answer is: ${result}`);
    }
}
