import { expect, test } from '@oclif/test';

import { answerString } from '../helpers/answer';

describe('Day6', () => {
    test.stdout()
        .command(['Day6', '--test'])
        .it('Calculates answers correctly', (ctx) => {
            expect(ctx.stdout).to.contain(answerString(1, 5934), 'Part 1');
            expect(ctx.stdout).to.contain(answerString(2, 26_984_457_539), 'Part 2');
        });
});
