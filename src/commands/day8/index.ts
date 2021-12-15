import { difference, sum, toNumber, uniq } from 'lodash';

import AdventCommand from '~shared/advent-command';
import { parseFile, splitLines } from '~shared/file';
import { getByValue } from '~shared/map';

type Line = {
    input: string[];
    output: string[];
};

type Input = Line[];

export default class Day8Challenge extends AdventCommand<Input> {
    static aliases = ['day:8'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data).map((line) => {
            const [input, output] = line.split(' | ');
            return {
                input: input
                    .split(' ')
                    .map((segment) => [...segment].sort().join(''))
                    .sort((a, b) => a.length - b.length),
                output: output.split(' ').map((segment) => [...segment].sort().join(''))
            } as Line;
        });
    }

    protected part1(input: Input): number {
        let count = 0;
        for (const line of input) {
            for (const segment of line.output) {
                if (segment.length === 2 || segment.length === 3 || segment.length === 4 || segment.length === 7) {
                    count++;
                }
            }
        }

        return count;
    }

    private resolveSegment(line: Line): number {
        const mapping = new Map<string, number>();

        for (const segment of uniq([...line.output, ...line.input])) {
            switch (segment.length) {
                case 2: {
                    mapping.set(segment, 1);
                    break;
                }

                case 4: {
                    mapping.set(segment, 4);
                    break;
                }

                case 3: {
                    mapping.set(segment, 7);
                    break;
                }

                case 7: {
                    mapping.set(segment, 8);
                    break;
                }
            }
        }

        for (const segment of line.input) {
            if (mapping.get(segment) !== undefined) {
                continue;
            }

            if (segment.length === 5) {
                const diffOne = difference([...segment], [...getByValue(mapping, 1)]);
                if (diffOne.length === 3) {
                    mapping.set(segment, 3);
                } else {
                    const diffFour = difference(diffOne, [...getByValue(mapping, 4)]);
                    if (diffFour.length === 2) {
                        mapping.set(segment, 5);
                    } else {
                        mapping.set(segment, 2);
                    }
                }
            }

            if (segment.length === 6) {
                const diffFour = difference([...segment], [...getByValue(mapping, 4)]);
                if (diffFour.length === 2) {
                    mapping.set(segment, 9);
                } else {
                    const diffSeven = difference([...segment], [...getByValue(mapping, 7)]);
                    if (diffSeven.length === 3) {
                        mapping.set(segment, 0);
                    } else {
                        mapping.set(segment, 6);
                    }
                }
            }
        }

        let stringNum = '';
        for (const segment of line.output) {
            stringNum += mapping.get(segment);
        }

        return toNumber(stringNum);
    }

    protected part2(input: Input): number {
        return sum(input.map((line) => this.resolveSegment(line)));
    }
}
