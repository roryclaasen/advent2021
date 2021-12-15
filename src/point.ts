import { stringify } from './utils';

export interface Point {
    x: number;
    y: number;
}

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

export const hasPoint = (map: Map<string, any>, point: Point): boolean => {
    return map.has(stringify(point));
};
