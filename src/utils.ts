import { readFile } from 'fs';

export const parseFile = (file: string) => {
    return new Promise<string>((resolve, reject) => {
        readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const splitLines = (data: string) => data.split('\n');

