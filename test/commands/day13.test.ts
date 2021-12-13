import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('day13', () => {
    const PART1_ANSWER = answerString(1, 17);
    const PART2_ANSWER = answerString(
        2,
        `▓▓▓▓▓
▓░░░▓
▓░░░▓
▓░░░▓
▓▓▓▓▓`
    );

    test.stdout()
        .command(['day13', '--test'])
        .it('Calculates all answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(PART1_ANSWER, 'Part 1');
            expect(ctx.stdout).to.contain(PART2_ANSWER, 'Part 2');
        });

    test.stdout()
        .command(['day13', '--test', '--part=1'])
        .it('Calculates only part 1 answer correctly', (ctx) => {
            expect(ctx.stdout).to.contain(PART1_ANSWER, 'Part 1');
            expect(ctx.stdout).to.not.contain(PART2_ANSWER, 'Part 2');
        });

    test.stdout()
        .command(['day13', '--test', '--part=2'])
        .it('Calculates only part 2 answer correctly', (ctx) => {
            expect(ctx.stdout).to.not.contain(PART1_ANSWER, 'Part 1');
            expect(ctx.stdout).to.contain(PART2_ANSWER, 'Part 2');
        });
});
