import { readFile } from 'fs';
import path from 'path';

export const parseFile = (file: string, directory?: string): Promise<string> => {
    const filePath = directory ? path.resolve(directory, file) : file;
    return new Promise<string>((resolve, reject) => {
        readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.replace(/\r/g, ''));
            }
        });
    });
};

export const splitLines = (data: string): string[] => data.split(/\n/);

export const getByValue = <K, V>(map: Map<K, V>, searchValue: V): K => {
    for (const [key, value] of map.entries()) {
        if (value === searchValue) return key;
    }

    return undefined;
};

export const stringify = <T = any>(data: T): string => JSON.stringify(data);

export const incrementMap = (map: Map<string, number>, key: string, ammount = 1) => {
    if (!map.has(key)) {
        map.set(key, 0);
    }

    map.set(key, map.get(key) + ammount);
};
