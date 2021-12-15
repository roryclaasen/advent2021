import AdventCommand from '~shared/advent-command';
import { parseFile, splitLines } from '~shared/file';

type Input = string[];

export default class Day10Challenge extends AdventCommand<Input> {
    private readonly opening = ['(', '[', '{', '<'];
    private readonly closing = [')', ']', '}', '>'];

    static aliases = ['day:10'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return splitLines(data);
    }

    private checkLineSyntax(line: string, onError?: (char: string) => void): string[] {
        const syntax = [...line];
        const stack: string[] = [];
        for (const char of syntax) {
            if (this.opening.includes(char)) {
                stack.push(char);
            } else if (this.closing.includes(char)) {
                if (stack[stack.length - 1] === this.opening[this.closing.indexOf(char)]) {
                    stack.pop();
                } else {
                    if (onError) {
                        onError(char);
                    }

                    break;
                }
            } else {
                throw new Error(`Invalid character '${char}'`);
            }
        }

        return stack;
    }

    protected part1(input: Input): number {
        let totalError = 0;
        for (const line of input) {
            this.checkLineSyntax(line, (char) => {
                switch (char) {
                    case ')':
                        totalError += 3;
                        break;
                    case ']':
                        totalError += 57;
                        break;
                    case '}':
                        totalError += 1197;
                        break;
                    case '>':
                        totalError += 25_137;
                        break;
                }
            });
        }

        return totalError;
    }

    protected part2(input: Input): number {
        const incompleteInputLines: string[] = [];
        for (const line of input) {
            let error = false;

            this.checkLineSyntax(line, () => {
                error = true;
            });

            if (!error) {
                incompleteInputLines.push(line);
            }
        }

        const scores: number[] = [];
        for (const line of incompleteInputLines) {
            const stack = this.checkLineSyntax(line);

            let score = 0;
            for (const char of stack.reverse()) {
                score *= 5;
                score += this.opening.indexOf(char) + 1;
            }

            scores.push(score);
        }

        return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
    }
}
