import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day5', () => {
    test.stdout()
        .command(['Day5', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 5), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 12), 'Part 2');
        });
});
