// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ObjectMap<K = any, V = any> {
    private map: Map<string, V>;

    constructor(map?: Map<K, V>) {
        this.map = new Map();
        if (map !== undefined) {
            for (const [point, value] of map) {
                this.map.set(this.stringify(point), value);
            }
        }
    }

    public set(key: K, value: V): this {
        this.map.set(this.stringify(key), value);
        return this;
    }

    public get(key: K): V | undefined {
        return this.map.get(this.stringify(key));
    }

    public has(key: K): boolean {
        return this.map.has(this.stringify(key));
    }

    public delete(key: K): boolean {
        return this.map.delete(this.stringify(key));
    }

    public get size() {
        return this.map.size;
    }

    private stringify(key: K): string {
        return JSON.stringify(key);
    }
}
