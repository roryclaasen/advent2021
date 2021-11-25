import { cli } from 'cli-ux';

import { flags } from '@oclif/command';

import AdventCommand from '../../base';

export default class Day0 extends AdventCommand {
    public static description = 'This is an Advent of Code example challenge';

    public static examples = [
        `$ advent2021 Day0
The answer is: No Input
`
    ];

    public static flags = {
        help: flags.help({ char: 'h' }),
        name: flags.string({ char: 'n', description: 'name to print' }),
        throw: flags.boolean({ char: 't', description: 'throw an error' })
    };

    public static args = [{ name: 'text' }];

    protected async compute(): Promise<string> {
        const { flags, args } = this.parse(Day0);

        await cli.wait(2500);

        if (flags.throw) {
            throw new Error('I am an error');
        }

        if (args.text && flags.name) {
            return `Hello ${flags.name} from ${args.text}`;
        }

        return args.text ?? flags.name ?? 'No Input';
    }
}
