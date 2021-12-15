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
