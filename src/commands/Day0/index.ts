import { flags } from '@oclif/command';

import AdventCommand from '../../base';

export default class Day0 extends AdventCommand {
    public static description = "This is an example day";

    public static flags = {
        help: flags.help({ char: "h" }),
        name: flags.string({ char: "n", description: "name to print" }),
    };

    public static args = [{ name: "file" }];

    private sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    protected async compute(): Promise<string> {
        const { flags, args } = this.parse(Day0);

        await this.sleep(2500);

        if (args.file && flags.name){
            return `Hello ${flags.name} from ${args.file}`;
        }

        return args.file ?? flags.name ?? "No Input";
    }
}
