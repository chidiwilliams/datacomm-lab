const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const mth = math.create({
  epsilon: 1e-5,
});

const fRes = () => {
  // Generate sine wave with frequency of 4
  const res = new lab.CarrierSignal(16, 4).getFrequencyResponse();

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
  fRes,
};
