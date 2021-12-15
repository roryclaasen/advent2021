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
