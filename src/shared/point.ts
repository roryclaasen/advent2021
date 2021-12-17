import { max, min } from 'lodash';

export type Point = {
    x: number;
    y: number;
};

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

export const within = (target: Point, point1: Point, point2: Point): boolean => {
    const minX = min([point1.x, point2.x]);
    const maxX = max([point1.x, point2.x]);
    const minY = min([point1.y, point2.y]);
    const maxY = max([point1.y, point2.y]);
    return target.x >= minX && target.x <= maxX && target.y >= minY && target.y <= maxY;
};
