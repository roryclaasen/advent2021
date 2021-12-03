import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Instruction = {
    dir: 'forward' | 'down' | 'up';
    amount: number;
};

export default class Day2Challenge extends AdventCommand {
    private async parseInput(test: boolean): Promise<Instruction[]> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        return splitLines(data).map((line) => {
            const [dir, amount] = line.split(' ');
            return {
                dir,
                amount: toNumber(amount)
            } as Instruction;
        });
    }

    private part1(input: Instruction[]): number {
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

    private part2(input: Instruction[]): number {
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

    protected async compute(test: boolean): Promise<[number, number]> {
        const input = await this.parseInput(test);

        const part1 = this.part1(input);
        const part2 = this.part2(input);

        return [part1, part2];
    }
}
