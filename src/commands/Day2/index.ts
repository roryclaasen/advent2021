import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Instruction = {
    dir: 'forward' | 'down' | 'up';
    amount: number;
};

export default class Day2Challenge extends AdventCommand<[number, number]> {
    private async parseInput(): Promise<Instruction[]> {
        return await parseFile(path.resolve(__dirname, 'input'))
            .then(splitLines)
            .then((lines) =>
                lines.map((line) => {
                    const [dir, amount] = line.split(' ');
                    return {
                        dir,
                        amount: toNumber(amount)
                    } as Instruction;
                })
            );
    }

    private part1(input: Instruction[]): number {
        let horizontal = 0;
        let depth = 0;

        for (const instruction of input) {
            if (instruction.dir === 'forward') {
                horizontal += instruction.amount;
            } else if (instruction.dir === 'down') {
                depth += instruction.amount;
            } else if (instruction.dir === 'up') {
                depth -= instruction.amount;
            }
        }

        return horizontal * depth;
    }

    private part2(input: Instruction[]): number {
        let horizontal = 0;
        let depth = 0;
        let aim = 0;

        for (const instruction of input) {
            if (instruction.dir === 'forward') {
                horizontal += instruction.amount;
                depth += aim * instruction.amount;
            } else if (instruction.dir === 'down') {
                aim += instruction.amount;
            } else if (instruction.dir === 'up') {
                aim -= instruction.amount;
            }
        }

        return horizontal * depth;
    }

    protected async compute(): Promise<[number, number]> {
        const input = await this.parseInput();

        const part1 = this.part1(input);
        const part2 = this.part2(input);

        return [part1, part2];
    }
}
