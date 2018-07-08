const expect = require('chai').expect;
const lab = require('../../dist');

const encode = () => {
  const enc = new lab.Hamming4().encode([1, 0, 1, 0]);
  expect(enc).to.eql([1, 0, 1, 1, 0, 1, 0]);
};

const rejectEncodingByLength = () => {
  const hamm = new lab.Hamming4();
  expect(() => hamm.encode([1, 0, 1, 0, 5])).to.throw(
    'Input array must have a length of 4.'
  );
};

const encodeP = () => {
  const enc = new lab.Hamming4().encode([1, 1, 1, 0], true);
  expect(enc).to.eql([0, 0, 1, 0, 1, 1, 0, 1]);
};

const decode = () => {
  const dec = new lab.Hamming4().decode([1, 0, 1, 0, 1, 0, 1]);
  expect(dec).to.eql([1, 1, 0, 1]);
};

const rejectDecodingByLength = () => {
  const hamm = new lab.Hamming4();
  expect(() => hamm.decode([1, 0, 1, 0, 1, 0, 1, 0])).to.throw(
    'Input array must have a length of 7.'
  );
};

const correct = () => {
  const cor = new lab.Hamming4().correct([1, 1, 1, 0, 1, 0, 0]);
  expect(cor).to.eql([1, 1, 1, 0, 0, 0, 0]);
};

const rejectCorrectionByLength = () => {
  const hamm = new lab.Hamming4();
  expect(() => hamm.correct([1, 0, 1, 0, 1, 0])).to.throw(
    'Input array must have a length of 7.'
  );
};

module.exports = {
  encode,
  rejectEncodingByLength,
  encodeP,
  decode,
  rejectDecodingByLength,
  correct,
  rejectCorrectionByLength,
};
