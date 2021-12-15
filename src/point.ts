import { stringify } from './utils';

export type Point = {
    x: number;
    y: number;
};

export class PointMap<V = any> {
    private map: Map<string, V>;

    constructor(map?: Map<Point, V>) {
        this.map = new Map();
        if (map !== undefined) {
            for (const [point, value] of map) {
                this.map.set(stringify(point), value);
            }
        }
    }

    set(key: Point, value: V): this {
        this.map.set(stringify(key), value);
        return this;
    }

    get(key: Point): V | undefined {
        return this.map.get(stringify(key));
    }

    has(key: Point): boolean {
        return this.map.has(stringify(key));
    }

    delete(key: Point): boolean {
        return this.map.delete(stringify(key));
    }

    get size() {
        return this.map.size;
    }
}

export const getNeighbors = (point: Point, diagonal = false): Point[] => {
    const direct = [
        { x: point.x - 1, y: point.y },
        { x: point.x + 1, y: point.y },
        { x: point.x, y: point.y - 1 },
        { x: point.x, y: point.y + 1 }
    ];

    if (!diagonal) {
        return direct;
    }

    return [...direct, { x: point.x - 1, y: point.y - 1 }, { x: point.x + 1, y: point.y - 1 }, { x: point.x - 1, y: point.y + 1 }, { x: point.x + 1, y: point.y + 1 }];
};
