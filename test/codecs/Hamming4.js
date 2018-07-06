const expect = require('chai').expect;
const { Hamming4 } = require('../../dist');

const encode = () => {
  const enc = new Hamming4().encode([1, 0, 1, 0]);
  expect(enc).to.eql([1, 0, 1, 1, 0, 1, 0]);
};

const encodeP = () => {
  const enc = new Hamming4().encode([1, 1, 1, 0], true);
  expect(enc).to.eql([0, 0, 1, 0, 1, 1, 0, 1]);
};

const decode = () => {
  const dec = new Hamming4().decode([1, 0, 1, 0, 1, 0, 1]);
  expect(dec).to.eql([1, 1, 0, 1]);
};

const correct = () => {
  const cor = new Hamming4().correct([1, 1, 1, 0, 1, 0, 0]);
  expect(cor).to.eql([1, 1, 1, 0, 0, 0, 0]);
};

module.exports = {
  encode,
  encodeP,
  decode,
  correct,
};
