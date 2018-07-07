const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const fRes = () => {
  // Generate sine wave with frequency of 4
  const res = new lab.CarrierSignal(16, 4).getFrequencyResponse();

  // Every frequency except 4 must have magnitude of zero
  res
    .slice(0, 4)
    .concat(res.slice(5))
    .forEach((x, i, a) => {
      expect(math.abs(x)).to.be.lessThan(0.008);
    });

  // Frequency 4 must have magnitude of 1
  expect(math.abs(1 - res[4])).to.be.lessThan(0.008);
};

module.exports = {
  fRes,
};
