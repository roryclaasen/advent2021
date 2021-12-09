import { toNumber } from 'lodash';

import AdventCommand from '../../base';
import { parseFile } from '../../utils';

type Input = number[];

export default class Day7Challenge extends AdventCommand<Input> {
    static aliases = ['day:7'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return data.split(',').map(toNumber);
    }

    private simulate(input: Input, cal: (dist: number) => number): number {
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

    protected part1(input: Input): number {
        return this.simulate(input, (dist) => dist);
    }

    protected part2(input: Input): number {
        return this.simulate(input, (dist) => (dist * (dist + 1)) / 2);
    }
}
