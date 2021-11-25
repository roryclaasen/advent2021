import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

export default abstract class AdventCommand<TAnswer = string> extends Command {

    public static description = 'This is an Advent of Code challenge';

    public static examples = [
        `$ @roryclaasen/advent2021 ${this.name}
If you can read this, then I forgot to add an example for this challenge
`,
    ];

    protected abstract compute(): Promise<TAnswer>;

    public async run() {
        cli.action.start('Processing challenge')
        const result = await this.compute();
        cli.action.stop();
        this.showResult(result);
    }

    protected showResult(answer: TAnswer) {
        this.log(`The answer is: ${answer}`);
    }
}
