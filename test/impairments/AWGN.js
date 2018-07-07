const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const generate = () => {
  const n = new lab.AWGN().generate(2000);
  const m = math.abs(math.mean(n));

  expect(m).to.be.lessThan(0.08);
};

module.exports = {
  generate,
};
