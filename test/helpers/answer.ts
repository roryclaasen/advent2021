export const answerString = (part: number, answer: any) => {
    if (part === 0) {
        return `The answer is: ${answer}\n`;
    }

    return `Part ${part} Answer: ${answer}\n`;
};
