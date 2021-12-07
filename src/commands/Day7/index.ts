import { toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile } from '../../utils';

export default class Day7Challenge extends AdventCommand {
    static aliases = ['day7', 'day:7'];

    private async parseInput(test: boolean): Promise<number[]> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        return data.split(',').map(toNumber);
    }

    private simulate(input: number[], cal: (dist: number) => number): number {
        let cheapest = -1;
        const closeCrab = Math.min(...input);
        const farCrab = Math.max(...input);
        for (let i = closeCrab; i < farCrab; i++) {
            let currentSum = 0;
            for (const [, current] of input.entries()) {
                const dist = Math.abs(current - i);
                if (dist === 0) continue;
                currentSum += cal(dist);
                if (currentSum > cheapest && cheapest !== -1) break;
            }

            if (currentSum < cheapest || cheapest === -1) {
                cheapest = currentSum;
            }
        }

        return cheapest;
    }

    private part1(input: number[]): number {
        return this.simulate(input, (dist) => dist);
    }

    private part2(input: number[]): number {
        return this.simulate(input, (dist) => (dist * (dist + 1)) / 2);
    }

    protected async compute(test: boolean): Promise<[number, number]> {
        const input = await this.parseInput(test);

        const part1 = this.part1(input);
        const part2 = this.part2(input);

        return [part1, part2];
    }
}
