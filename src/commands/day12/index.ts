import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Node = {
    links: Set<string>;
    isBig: boolean;
    id: string;
    leaf: boolean;
};

type Input = Map<string, Node>;

export default class Day12Challenge extends AdventCommand<Input> {
    static aliases = ['day:12'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const connections = new Map<string, Node>();

        const mapConnections = (a: string, b: string) => {
            const objectA = connections.has(a) ? connections.get(a) : { links: new Set<string>(), isBig: /[A-Z]/.test(a), id: a, leaf: ['start', 'end'].includes(a) };
            objectA.links.add(b);

            connections.set(a, objectA);
        };

        for (const connection of splitLines(data)) {
            const [from, to] = connection.split('-');

            mapConnections(from, to);
            mapConnections(to, from);
        }

        return connections;
    }

    private walk1(input: Input, node: Node, currentPath: string[] = [], visited = new Set<string>()): number {
        let paths = 0;
        const newCurrentPath = [...currentPath];

        if (visited.has(node.id)) {
            return paths;
        }

        if (!node.isBig) {
            visited.add(node.id);
        }

        newCurrentPath.push(node.id);

        for (const link of node.links) {
            paths += link === 'end' ? 1 : this.walk1(input, input.get(link), newCurrentPath, new Set(visited));
        }

        return paths;
    }

    // eslint-disable-next-line max-params
    private walk2(input: Input, node: Node, currentPath: string[] = [], visited = new Set<string>(), flag = false): number {
        let paths = 0;
        const newCurrentPath = [...currentPath];

        if (visited.has(node.id)) {
            if (flag || node.leaf) {
                return paths;
            }

            flag = true;
        }

        if (!node.isBig) {
            visited.add(node.id);
        }

        newCurrentPath.push(node.id);

        for (const link of node.links) {
            paths += link === 'end' ? 1 : this.walk2(input, input.get(link), newCurrentPath, new Set(visited), flag);
        }

        return paths;
    }

    protected part1(input: Input): number {
        return this.walk1(input, input.get('start'));
    }

    protected part2(input: Input): number {
        return this.walk2(input, input.get('start'));
    }
}
