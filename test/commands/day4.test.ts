import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day4', () => {
    test.stdout()
        .command(['Day4', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 4512), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 1924), 'Part 2');
        });
});
