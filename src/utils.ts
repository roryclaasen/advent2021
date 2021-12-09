import { readFile } from 'fs';
import path from 'path';

export const parseFile = (file: string, directory?: string) => {
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

export const splitLines = (data: string) => data.split(/\n/);

export const getByValue = <K, V>(map: Map<K, V>, searchValue: V): K => {
    for (const [key, value] of map.entries()) {
        if (value === searchValue) return key;
    }

    return undefined;
};

export const stringify = (data: any) => JSON.stringify(data);
