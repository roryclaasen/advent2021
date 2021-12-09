import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type BinaryNumber = '0' | '1';

export default class Day3Challenge extends AdventCommand {
    static aliases = ['day:3'];

    protected async parseInput(test: boolean): Promise<string[]> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data);
    }

    protected part1(input: string[]): number {
        const results: {
            [key: string]: number;
        }[] = [];

        for (const line of input) {
            for (const [i, current] of [...line].entries()) {
                if (results[i] === undefined) {
                    results[i] = {};
                }

                if (results[i][current] === undefined) {
                    results[i][current] = 1;
                } else {
                    results[i][current]++;
                }
            }
        }

        const gammaRate: BinaryNumber[] = [];
        const epsilonRate: BinaryNumber[] = [];

        for (const [i, col] of results.entries()) {
            gammaRate[i] = col['1'] > col['0'] ? '1' : '0';
            epsilonRate[i] = col['1'] > col['0'] ? '0' : '1';
        }

        const parseArray = (array: BinaryNumber[]): number => {
            const binaryString = array.join('');
            return Number.parseInt(binaryString, 2);
        };

        const gamma = parseArray(gammaRate);
        const epsilon = parseArray(epsilonRate);
        return gamma * epsilon;
    }

    protected part2(input: string[]): number {
        const findNumber = (match: (bit1Count: number, bit0Count: number) => BinaryNumber) => {
            let position = 0;
            let data = [...input];

            do {
                const searchBits: BinaryNumber[] = data.map((line) => line.charAt(position) as BinaryNumber);
                const one = searchBits.filter((bit) => bit === '1').length;
                const zero = searchBits.filter((bit) => bit === '0').length;

                data = data.filter((line) => line.charAt(position) === match(one, zero));
                position++;
            } while (data.length > 1);

            return Number.parseInt(data[0], 2);
        };

        const oxygen = findNumber((bit1Count, bit0Count) => (bit1Count >= bit0Count ? '1' : '0'));
        const co2 = findNumber((bit1Count, bit0Count) => (bit1Count >= bit0Count ? '0' : '1'));
        return oxygen * co2;
    }
}
