import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day7', () => {
    test.stdout()
        .command(['Day7', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 37), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 168), 'Part 2');
        });
});
