import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day2', () => {
    test.stdout()
        .command(['Day2', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 150), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 900), 'Part 2');
        });
});
