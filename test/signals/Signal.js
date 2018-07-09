const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const mth = math.create({
  epsilon: 1e-5,
});

const create = () => {
  const sig = new lab.Signal(2);
  expect(sig.signal).to.eql([0, 0]);
};

const setSignal = () => {
  const sig = new lab.Signal(2);
  sig.signal = [1, 1];

  expect(sig.signal).to.eql([1, 1]);
};

const getSignalValue = () => {
  const sig = new lab.Signal(2);
  sig.signal = [1, 0];
  const sig0 = sig.getSignalValue(0);

  expect(sig0).to.eql(1);
};

const setSignalValue = () => {
  const sig = new lab.Signal(4);
  sig.signal = [1, 0, 0, 1];
  sig.setSignalValue(1, 1);

  expect(sig.signal).to.eql([1, 1, 0, 1]);
};

const sample = () => {
  const sig = new lab.Signal(3);
  sig.signal = [1, 0, 1];

  expect(sig.sample(6)).to.eql([1, 1, 0, 0, 1, 1]);
};

const rejectSampleForNonMultipleFreq = () => {
  const sig = new lab.Signal(4);
  expect(() => sig.sample(11)).to.throw(
    'New sampling frequency must be a multiple of the previous sampling frequency'
  );
};

const fRes = () => {
  // Generate sine wave with frequency of 4
  const res = new lab.WaveSignal(
    lab.WaveSignalType.SINE,
    16,
    4
  ).getFrequencyResponse();

  // Every frequency except 4 must have magnitude of zero
  res
    .slice(0, 4)
    .concat(res.slice(5))
    .forEach((x, i, a) => {
      expect(mth.equal(x, 0)).to.be.true;
    });

  // Frequency 4 must have magnitude of 1
  expect(mth.equal(res[4], 1)).to.be.true;
};

module.exports = {
  create,
  setSignal,
  getSignalValue,
  setSignalValue,
  sample,
  rejectSampleForNonMultipleFreq,
  fRes,
};
