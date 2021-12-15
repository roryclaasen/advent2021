import { toNumber } from 'lodash';

import AdventCommand from '~shared/advent-command';
import { parseFile, splitLines } from '~shared/file';

type Instruction = {
    dir: 'forward' | 'down' | 'up';
    amount: number;
};

type Input = Instruction[];

export default class Day2Challenge extends AdventCommand<Input> {
    static aliases = ['day:2'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data).map((line) => {
            const [dir, amount] = line.split(' ');
            return {
                dir,
                amount: toNumber(amount)
            } as Instruction;
        });
    }

    protected part1(input: Input): number {
        let horizontal = 0;
        let depth = 0;

        for (const instruction of input) {
            switch (instruction.dir) {
                case 'forward':
                    horizontal += instruction.amount;
                    break;
                case 'down':
                    depth += instruction.amount;
                    break;
                case 'up':
                    depth -= instruction.amount;
                    break;
            }
        }

        return horizontal * depth;
    }

    protected part2(input: Input): number {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;

        for (const instruction of input) {
            switch (instruction.dir) {
                case 'forward':
                    horizontal += instruction.amount;
                    depth += aim * instruction.amount;
                    break;
                case 'down':
                    aim += instruction.amount;
                    break;
                case 'up':
                    aim -= instruction.amount;
                    break;
            }
        }

        return horizontal * depth;
    }
}
