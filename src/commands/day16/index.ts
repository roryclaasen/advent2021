import { max, min, sum, toNumber } from 'lodash';
import { Except } from 'type-fest';

import AdventCommand from '~shared/advent-command';
import { parseFile } from '~shared/file';
import { binToDec, hexToBin } from '~shared/number';

enum PacketType {
    Sum = 0,
    Product = 1,
    Minimum = 2,
    Maximum = 3,
    Literal = 4,
    GreaterThan = 5,
    LessThan = 6,
    EqualTo = 7
}

type PacketBase<T> = {
    version: number;
    type: PacketType;
    data: T;
};

type LiteralValuePacket = Except<PacketBase<number>, 'type'> & {
    type: PacketType.Literal;
};

type OperatorPacket = PacketBase<Packet[]>;

type Packet = LiteralValuePacket | OperatorPacket;

type Input = string;

const binaryToDecimal = (input: string[]): number => binToDec(input.join(''));
const splice = (input: string[], end: number) => input.splice(0, end);

const isLiteral = (packet: Packet): packet is LiteralValuePacket => packet.type === PacketType.Literal;

export default class Day16Challenge extends AdventCommand<Input> {
    static aliases = ['day:16'];

    protected async parseInput(test: boolean): Promise<Input> {
        const data = await parseFile(test ? 'testinput' : 'input', __dirname);
        return [...data]
            .map(hexToBin)
            .map((bin) => bin.padStart(4, '0'))
            .join('');
    }

    private parsePacket(packet: string[]): Packet {
        if (packet.length === 0) {
            throw new Error('Empty packet');
        }

        const version = binaryToDecimal(splice(packet, 3));
        const type = binaryToDecimal(splice(packet, 3));

        if (type === PacketType.Literal) {
            const parsed: string[] = [];
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const [leading, ...bits] = splice(packet, 5);
                parsed.push(...bits);

                if (leading === '0') {
                    break;
                }
            }

            return {
                version,
                type,
                data: binaryToDecimal(parsed)
            };
        }

        const typeLengthId = toNumber(splice(packet, 1));

        const subPackets: Packet[] = [];
        if (typeLengthId === 0) {
            const totalLength = binaryToDecimal(splice(packet, 15));
            const subpacket = splice(packet, totalLength);

            while(subpacket.length > 0) {
                subPackets.push(this.parsePacket(subpacket));
            }
        } else if (typeLengthId === 1) {
            const totalCount = binaryToDecimal(splice(packet, 11));
            for (let i = 0; i < totalCount; i++) {
                subPackets.push(this.parsePacket(packet));
            }
        } else {
            throw new Error('Invalid type length');
        }

        return {
            version,
            type,
            data: subPackets
        };
    }

    protected part1(input: Input): number {
        const packet = this.parsePacket([...input]);

        const sumPacket = (packet: Packet): number => {
            if (isLiteral(packet)) {
                return packet.version;
            }

            return packet.version + sum(packet.data.map(sumPacket));
        };

        return sumPacket(packet);
    }

    protected part2(input: Input): number {
        const packet = this.parsePacket([...input]);

        const calculatePacket = (packet: Packet): number => {
            if (isLiteral(packet)) {
                return packet.data;
            }

            const values = packet.data.map(calculatePacket);

            switch (packet.type) {
                case PacketType.Sum:
                    return sum(values);
                case PacketType.Product:
                    return values.reduce((acc, val) => acc * val, 1);
                case PacketType.Minimum:
                    return min(values);
                case PacketType.Maximum:
                    return max(values);
                case PacketType.GreaterThan:
                    return values[0] > values[1] ? 1 : 0;
                case PacketType.LessThan:
                    return values[0] < values[1] ? 1 : 0;
                case PacketType.EqualTo:
                    return values[0] === values[1] ? 1 : 0;
                default:
                    return 0;
            }
        };

        return calculatePacket(packet);
    }
}
