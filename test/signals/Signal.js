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

const rejectSetSignalForChangeLen = () => {
  const sig = new lab.Signal(2);

  expect(() => (sig.signal = [1, 2, 3, 4])).to.throw('Invalid signal length.');
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

const sampleLower = () => {
  const sig = new lab.Signal(6);
  sig.signal = [1, 2, 3, 4, 5, 6];

  expect(sig.sample(2)).to.eql([2, 5]);
};

const rejectSampleLowerForNonFactFreq = () => {
  const sig = new lab.Signal(32);
  expect(() => sig.sample(5)).to.throw(
    'The new sampling frequency must be a factor of the current sampling frequency if it is lower than the current sampling frequency.'
  );
};

const sampleHigher = () => {
  const sig = new lab.Signal(3);
  sig.signal = [1, 0, 1];

  expect(sig.sample(6)).to.eql([1, 1, 0, 0, 1, 1]);
};

const rejectSampleHigherForNonMultFreq = () => {
  const sig = new lab.Signal(4);
  expect(() => sig.sample(11)).to.throw(
    'The new sampling frequency must be a multiple of the current sampling frequency if it is higher than the current sampling frequency.'
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

const rejectFResForNonPow2Fs = () => {
  // Generate sine wave with Fs = 21
  const sig = new lab.WaveSignal(lab.WaveSignalType.SINE, 21, 4);

  expect(() => sig.getFrequencyResponse()).to.throw(
    'Signal sampling frequency must be a power of 2.'
  );
};

module.exports = {
  create,
  setSignal,
  getSignalValue,
  setSignalValue,
  rejectSetSignalForChangeLen,
  sampleLower,
  rejectSampleLowerForNonFactFreq,
  sampleHigher,
  rejectSampleHigherForNonMultFreq,
  fRes,
  rejectFResForNonPow2Fs,
};
