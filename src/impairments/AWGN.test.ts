import { expect } from 'chai';
import math from 'mathjs';
import { AWGN } from './AWGN';

describe('AWGN tests', () => {
  it('should generate sample with mean between -0.08 and +0.08', () => {
    const n = AWGN.generate(2000);
    const m = math.abs(math.mean(n));

    expect(m).to.be.lessThan(0.08);
  });
});
