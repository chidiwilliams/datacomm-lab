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

  sig.signal.forEach((x, i) =>
    expect(math.abs(x - rec[i])).to.be.lessThan(1e-5)
  );
};

const genTriangular = () => {
  const sig = new lab.WaveSignal(lab.WaveSignalType.TRIANGULAR, 8, 2, 0);

  const rec = [0, 1, 0, -1, 0, 1, 0, -1];
  sig.signal.forEach((x, i) =>
    expect(math.abs(x - rec[i])).to.be.lessThan(1e-5)
  );
};

const genSquare = () => {
  const sig = new lab.WaveSignal(lab.WaveSignalType.SQUARE, 8, 2, 0);

  const rec = [1, 1, 0, 0, 1, 1, 0, 0];
  sig.signal.forEach((x, i) =>
    expect(math.abs(x - rec[i])).to.be.lessThan(1e-5)
  );
};

module.exports = {
  rejectGenForFsAboveNyquist,
  genSine,
  genTriangular,
  genSquare,
};
