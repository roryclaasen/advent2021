import { sum, toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile } from '../../utils';

type BingoCell = {
    value: number;
    marked: boolean;
};

type BingoBoard = BingoCell[][];

interface Bingo {
    series: number[];
    boards: BingoBoard[];
}

const WIDTH = 5;
const HEIGHT = 5;

export default class Day4Challenge extends AdventCommand {
    private async parseInput(test: boolean): Promise<Bingo> {
        const file = test ? 'testinput' : 'input';
        const data = await parseFile(path.resolve(__dirname, file));
        const parts = data.split(/\n{2}/);
        return {
            series: parts[0].split(/,/).map(toNumber),
            boards: parts.slice(1).map((line) =>
                line.split(/\n/).map((row) =>
                    row
                        .split(/\s/)
                        .filter((value) => value.length > 0)
                        .map((num) => ({ value: toNumber(num), marked: false } as BingoCell))
                )
            )
        };
    }

    private updateBoard(board: BingoBoard, value: number) {
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                if (board[y][x].value === value) {
                    board[y][x].marked = true;
                }
            }
        }
    }

    private hasBoardWon(board: BingoBoard) {
        for (let y = 0; y < HEIGHT; y++) {
            let row = true;
            for (let x = 0; x < WIDTH; x++) {
                if (!board[y][x].marked) {
                    row = false;
                    break;
                }
            }

            if (row === true) {
                return true;
            }
        }

        for (let x = 0; x < WIDTH; x++) {
            let col = true;
            for (let y = 0; y < HEIGHT; y++) {
                if (!board[y][x].marked) {
                    col = false;
                    break;
                }
            }

            if (col === true) {
                return true;
            }
        }

        return false;
    }

    private calculateScore(board: BingoBoard, winningMove: number): number {
        // this.log(board);

        const winnerValues = board
            .flat()
            .filter((cell) => !cell.marked)
            .map((cell) => cell.value);

        return sum(winnerValues) * winningMove;
    }

    private part1(input: Bingo): number {
        let currentPicked: number;
        let winner: BingoBoard;
        for (const picked of input.series) {
            currentPicked = picked;

            for (const board of input.boards) {
                this.updateBoard(board, picked);
                if (this.hasBoardWon(board)) {
                    winner = board;
                    break;
                }
            }

            if (winner) {
                break;
            }
        }

        if (!winner) {
            return -1;
        }

        return this.calculateScore(winner, currentPicked);
    }

    private part2(input: Bingo): number {
        let lastWinner = -1;

        for (const picked of input.series) {
            for (const board of input.boards) {
                if (this.hasBoardWon(board)) {
                    continue;
                }

                this.updateBoard(board, picked);
                if (this.hasBoardWon(board)) {
                    lastWinner = this.calculateScore(board, picked);
                }
            }
        }

        return lastWinner;
    }

    protected async compute(test: boolean): Promise<[number, number]> {
        const input = await this.parseInput(test);

        const part1 = this.part1(Object.assign({}, input));
        const part2 = this.part2(Object.assign({}, input));

        return [part1, part2];
    }
}
