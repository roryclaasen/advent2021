import { sum, toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile } from '../../utils';

type Input = Map<number, number>;

export default class Day6Challenge extends AdventCommand<Input> {
    static aliases = ['day6', 'day:6'];

    protected async parseInput(test: boolean): Promise<Input> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        const allFish = data.split(',').map(toNumber);

        const fishMap = new Map<number, number>();
        for (const fish of allFish) {
            if (!fishMap.has(fish)) {
                fishMap.set(fish, 0);
            }

            fishMap.set(fish, fishMap.get(fish) + 1);
        }

        return fishMap;
    }

    private simulate(input: Input, days: number): number {
        for (let d = 0; d < days; d++) {
            const dayFish = new Map<number, number>();
            for (const [stage, count] of input) {
                if (stage === 0) {
                    dayFish.set(6, (dayFish.get(6) || 0) + count);
                    dayFish.set(8, (dayFish.get(8) || 0) + count);
                } else {
                    dayFish.set(stage - 1, (dayFish.get(stage - 1) || 0) + count);
                }
            }

            input = dayFish;
        }

        return sum([...input.values()]);
    }

    protected part1(input: Input): number {
        return this.simulate(input, 80);
    }

    protected part2(input: Input): number {
        return this.simulate(input, 256);
    }
}
