import { sum, toNumber } from 'lodash';
import path from 'path';

import AdventCommand from '../../base';
import { parseFile } from '../../utils';

type BingoCell = {
    value: number;
    marked: boolean;
};

type BingoBoard = BingoCell[][];

type Input = {
    series: number[];
    boards: BingoBoard[];
};

const WIDTH = 5;
const HEIGHT = 5;

export default class Day4Challenge extends AdventCommand<Input> {
    static aliases = ['day4', 'day:4'];

    protected async parseInput(test: boolean): Promise<Input> {
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
        const winnerValues = board
            .flat()
            .filter((cell) => !cell.marked)
            .map((cell) => cell.value);

        return sum(winnerValues) * winningMove;
    }

    protected part1(input: Input): number {
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

    protected part2(input: Input): number {
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
}
