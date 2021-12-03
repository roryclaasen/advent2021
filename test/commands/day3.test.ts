import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day3', () => {
    test.stdout()
        .command(['Day3', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 198), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 230), 'Part 2');
        });
});
