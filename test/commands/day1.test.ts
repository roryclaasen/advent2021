import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day1', () => {
    test.stdout()
        .command(['Day1', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 7), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 5), 'Part 2');
        });
});
