export const answerString = (part: number, answer: any = ''): string => {
    if (typeof answer === 'string') {
        if (answer.includes('\n')) {
            return `Part ${part} Answer: \n${answer}\n`;
        }
    }

    return `Part ${part} Answer: ${answer}\n`;
};
