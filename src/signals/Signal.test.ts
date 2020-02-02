import { expect } from 'chai';
import { Signal } from './Signal';

describe('Signal tests', () => {
  it('should create empty Signal array', () => {
    const sig = new Signal(2);
    expect(sig.signal).to.eql([0, 0]);
  });

  it('should set Signal array', () => {
    const sig = new Signal(2);
    sig.signal = [1, 1];

    expect(sig.signal).to.eql([1, 1]);
  });

  it('should not set Signal array with an array of a different length', () => {
    const sig = new Signal(2);

    expect(() => (sig.signal = [1, 2, 3, 4])).to.throw(
      'Invalid signal length.',
    );
  });

  it('should get Signal array value at an index', () => {
    const sig = new Signal(2);
    sig.signal = [1, 0];
    const sig0 = sig.getSignalValue(0);

    expect(sig0).to.eql(1);
  });

  it('should set Signal array value at an index', () => {
    const sig = new Signal(4);
    sig.signal = [1, 0, 0, 1];
    sig.setSignalValue(1, 1);

    expect(sig.signal).to.eql([1, 1, 0, 1]);
  });

  it('should sample a signal at a lower sampling frequency', () => {
    const sig = new Signal(6);
    sig.signal = [1, 2, 3, 4, 5, 6];

    expect(sig.sample(2)).to.eql([2, 5]);
  });

  it('should not sample a signal if the new sampling frequency is lower and not a factor of the current sampling frequency', () => {
    const sig = new Signal(32);
    expect(() => sig.sample(5)).to.throw(
      'The new sampling frequency must be a factor of the current sampling frequency if it is lower than the current sampling frequency.',
    );
  });

  it('should sample a signal at a higher sampling frequency', () => {
    const sig = new Signal(3);
    sig.signal = [1, 0, 1];

    expect(sig.sample(6)).to.eql([1, 1, 0, 0, 1, 1]);
  });

  it('should not sample a signal if the new sampling frequency is lower and not a factor of the current sampling frequency', () => {
    const sig = new Signal(4);
    expect(() => sig.sample(11)).to.throw(
      'The new sampling frequency must be a multiple of the current sampling frequency if it is higher than the current sampling frequency.',
    );
  });

  it('should compute the Frequency magnitude response', () => {
    const sig = new Signal(8);
    sig.signal = [0, 1, 0, 1, 0, 1, 0, 1];

    expect(sig.getFrequencyResponse()).to.eql([0.5, 0, 0, 0, 0.5]);
  });

  it('should not compute the Frequency magnitude response if the sampling frequency is not a power of 2', () => {
    const sig = new Signal(9);
    sig.signal = [0, 1, 0, 1, 0, 1, 0, 1, 0];

    expect(() => sig.getFrequencyResponse()).to.throw(
      'Signal sampling frequency must be a power of 2.',
    );
  });

  it('should get binary thresholds', () => {
    const sig = new Signal(8);
    sig.signal = [1.2, -2.4, 2, 0, 9, -2.2, 0, -0.2];
    expect(sig.getBinaryThresholds(8)).to.eql([1, 0, 1, 0, 1, 0, 0, 0]);
    expect(sig.getBinaryThresholds(4)).to.eql([1, 1, 1, 1, 1, 1, 0, 0]);
  });
});
