import { expect } from 'chai';
import { BPSK } from './BPSK';

describe('BPSK tests', () => {
  it('should perform BPSK modulation', () => {
    const bpsk = new BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
    expect(bpsk.modulated).to.be.eql([0, -1, 0, 1]);
  });

  it('should not perform BPSK modulation if baseband and carrier have different lengths', () => {
    expect(() => new BPSK([1, 0, 1, 0], [0, 1, 0, -1, 0])).to.throw(
      'Baseband and carrier must have the same length.',
    );
  });

  it('should not perform BPSK modulation if baseband contains one or more non-binary values', () => {
    expect(() => new BPSK([1, 2, 1, 0], [0, 1, -1, 0])).to.throw(
      'Baseband signal must contain only binary values.',
    );
  });

  it('should perform BPSK demodulation', () => {
    const bpsk = new BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
    expect(bpsk.demodulated).to.be.eql([0, -1, 0, -1]);
  });

  it('should perform BPSK demodulation with given signal', () => {
    const bpsk = new BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
    const demod = bpsk.demodulate([0.1, -0.9, 0.05, 0.09]);
    expect(demod).to.be.eql([0, -0.9, 0, -0.09]);
  });

  it('should not perform BPSK demodulation if given signal and carrier have different lengths', () => {
    const bpsk = new BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
    expect(() => bpsk.demodulate([0.1, -0.9, 0.05])).to.throw(
      'Received signal and carrier must have the same length.',
    );
  });
});
