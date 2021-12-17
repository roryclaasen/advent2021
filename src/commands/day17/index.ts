import { clone, max, min } from 'lodash';

import AdventCommand from '~shared/advent-command';
import { parseFile } from '~shared/file';
import { Point, within } from '~shared/point';

type TargetArea = {
    p1: Point;
    p2: Point;
};

class Projectial {
    private velocity: Point;
    private targetArea: TargetArea;

    private position: Point;

    private _positions: Point[];

    constructor(velocity: Point, targetArea: TargetArea) {
        this.velocity = velocity;
        this.targetArea = targetArea;
        this.position = { x: 0, y: 0 };
        this._positions = [this.position];
    }

    public tickUntilFinished(): Promise<void> {
        return new Promise((resolve) => {
            while (!this.success && !this.failed) {
                this.tick();
            }

            resolve();
        });
    }

    public tick() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.positions.push(clone(this.position));

        if (this.velocity.x !== 0) {
            this.velocity.x += this.velocity.x > 0 ? -1 : 1;
        }

        this.velocity.y -= 1;
    }

    public get success(): boolean {
        return within(this.position, this.targetArea.p1, this.targetArea.p2);
    }

    public get failed(): boolean {
        return this.position.y < this.targetArea.p2.y || this.position.x > this.targetArea.p2.x;
    }

    public get positions(): Point[] {
        return this._positions;
    }
}

type Input = TargetArea;

export default class Day17Challenge extends AdventCommand<Input> {
    static aliases = ['day:17'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const match = data.match(/x=(\d+)..(\d+), y=(-?\d+)..(-?\d+)/);
        if (!match) {
            throw new Error('Invalid input');
        }

        const [, ...cords] = match;
        const [x1, x2, y1, y2] = cords.map(Number);

        return {
            p1: {
                x: min([x1, x2]),
                y: max([y1, y2])
            },
            p2: {
                x: max([x1, x2]),
                y: min([y1, y2])
            }
        };
    }

    private generateProjectials(targetArea: TargetArea): Projectial[] {
        const projectials: Projectial[] = [];
        const maxX = max([targetArea.p1.x, targetArea.p2.x]) + 1;
        const minY = min([targetArea.p1.y, targetArea.p2.y]);
        const maxY = Math.abs(minY) + 1;
        for (let x = 0; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                projectials.push(new Projectial({ x, y }, targetArea));
            }
        }

        return projectials;
    }

    protected async part1(input: Input): Promise<number> {
        const projectials = this.generateProjectials(input);
        await Promise.all(projectials.map((p) => p.tickUntilFinished()));

        return (
            projectials
                .filter((p) => p.success)
                .flatMap((p) => p.positions)
                .map((p) => p.y)
                .sort((a, b) => b - a)[0] ?? 0
        );
    }

    protected async part2(input: Input): Promise<number> {
        const projectials = this.generateProjectials(input);
        await Promise.all(projectials.map((p) => p.tickUntilFinished()));

        return projectials.filter((p) => p.success).length;
    }
}
