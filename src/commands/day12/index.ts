import AdventCommand from '../../base';
import { parseFile, splitLines } from '../../utils';

type Node = {
    links: Set<string>;
    isBig: boolean;
    id: string;
    isLeaf: boolean;
};

type Input = Map<string, Node>;

export default class Day12Challenge extends AdventCommand<Input> {
    static aliases = ['day:12'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        const connections = new Map<string, Node>();

        const mapConnections = (a: string, b: string) => {
            const objectA = connections.has(a) ? connections.get(a) : { links: new Set<string>(), isBig: /[A-Z]/.test(a), id: a, isLeaf: ['start', 'end'].includes(a) };
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

    // eslint-disable-next-line max-params
    private walk(input: Input, node: Node, exitCondidtion: (node: Node, flag: boolean) => boolean, currentPath: string[] = [], visited = new Set<string>(), flag = false): number {
        let paths = 0;

        if (visited.has(node.id)) {
            if (exitCondidtion(node, flag)) {
                return paths;
            }

            flag = true;
        }

        if (!node.isBig) {
            visited.add(node.id);
        }

        const newCurrentPath = [...currentPath, node.id];
        for (const link of node.links) {
            paths += link === 'end' ? 1 : this.walk(input, input.get(link), exitCondidtion, newCurrentPath, new Set(visited), flag);
        }

        return paths;
    }

    protected part1(input: Input): number {
        return this.walk(input, input.get('start'), () => true);
    }

    protected part2(input: Input): number {
        return this.walk(input, input.get('start'), ({ isLeaf }, flag) => flag || isLeaf);
    }
}
