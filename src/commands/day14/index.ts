import AdventCommand from '../../base';
import { incrementMap, parseFile, splitLines } from '../../utils';

type Input = {
    polymer: string;
    rules: Map<string, string>;
};

export default class Day14Challenge extends AdventCommand<Input> {
    static aliases = ['day:14'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const [template, pairs] = data.split('\n\n').map(splitLines);
        const map = new Map<string, string>();

        for (const pair of pairs) {
            const [key, value] = pair.split(' -> ');
            map.set(key, value);
        }

        return {
            polymer: template[0],
            rules: map
        };
    }

    private solve({ polymer, rules }: Input, steps: number): number {
        let current = new Map<string, number>();
        for (let i = 0; i < polymer.length - 1; i++) {
            const str = polymer.slice(i, i + 2);
            incrementMap(current, str);
        }

        for (let i = 0; i < steps; i++) {
            const temp = new Map<string, number>();
            for (const [key] of current) {
                const pair1 = key[0] + rules.get(key);
                const pair2 = rules.get(key) + key[1];

                incrementMap(temp, pair1, current.get(key));
                incrementMap(temp, pair2, current.get(key));
            }

            current = new Map(temp);
        }

        const count = new Map<string, number>();
        for (const [key] of current) {
            incrementMap(count, key[0], current.get(key) / 2);
            incrementMap(count, key[1], current.get(key) / 2);
        }

        incrementMap(count, polymer[0], 0.5);
        incrementMap(count, polymer[polymer.length - 1], 0.5);
        return Math.max(...count.values()) - Math.min(...count.values());
    }

    protected part1(input: Input): number {
        return this.solve(input, 10);
    }

    protected part2(input: Input): number {
        return this.solve(input, 40);
    }
}
