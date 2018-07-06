const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const generate = () => {
  const n = new lab.AWGN().generate(2000);
  const m = math.mean(n);

  expect(m).to.be.greaterThan(-0.05);
  expect(m).to.be.lessThan(0.05);
};

module.exports = {
  generate,
};
