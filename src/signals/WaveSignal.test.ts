import { expect } from 'chai';
import math from 'mathjs';
import { WaveSignal, WaveSignalType } from './WaveSignal';

describe('Wave signal tests', () => {
  it('should generate a signal with a frequency greater than or equal to half its sampling frequency', () => {
    expect(() => new WaveSignal(WaveSignalType.SINE, 64, 32)).to.throw(
      'Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)',
    );
  });
  it('should generate a sine wave signal', () => {
    const sig = new WaveSignal(WaveSignalType.SINE, 16, 2, 0);

    const rec = [
      0,
      0.7071,
      1,
      0.7071,
      0,
      -0.7071,
      -1,
      -0.7071,
      -0,
      0.7071,
      1,
      0.7071,
      0,
      -0.7071,
      -1,
      -0.7071,
    ];

    for (let i = 0; i < sig.signal.length; i++) {
      expect(math.abs(sig.signal[i] - rec[i])).to.be.lessThan(1e-5);
    }
  });
  it('should generate a triangular wave signal', () => {
    const sig = new WaveSignal(WaveSignalType.TRIANGULAR, 8, 2, 0);
    const rec = [0, 1, 0, -1, 0, 1, 0, -1];
    for (let i = 0; i < sig.signal.length; i++) {
      expect(math.abs(sig.signal[i] - rec[i])).to.be.lessThan(1e-5);
    }
  });
  it('should generate a square wave signal', () => {
    const sig = new WaveSignal(WaveSignalType.SQUARE, 8, 2, 0);
    expect(sig.signal).to.eql([1, 1, 0, 0, 1, 1, 0, 0]);
  });
});
