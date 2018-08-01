const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const rejectGenForFsAboveNyquist = () => {
  expect(() => new lab.WaveSignal(lab.WaveSignalType.SINE, 64, 32)).to.throw(
    'Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)'
  );
};

const genSine = () => {
  const sig = new lab.WaveSignal(lab.WaveSignalType.SINE, 16, 2, 0);

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
};

const genTriangular = () => {
  const sig = new lab.WaveSignal(lab.WaveSignalType.TRIANGULAR, 8, 2, 0);
  const rec = [0, 1, 0, -1, 0, 1, 0, -1];
  for (let i = 0; i < sig.signal.length; i++) {
    expect(math.abs(sig.signal[i] - rec[i])).to.be.lessThan(1e-5);
  }
};

const genSquare = () => {
  const sig = new lab.WaveSignal(lab.WaveSignalType.SQUARE, 8, 2, 0);
  expect(sig.signal).to.eql([1, 1, 0, 0, 1, 1, 0, 0]);
};

module.exports = {
  rejectGenForFsAboveNyquist,
  genSine,
  genTriangular,
  genSquare,
};
