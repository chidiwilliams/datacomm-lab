const expect = require('chai').expect;
const lab = require('../../dist');

const createWFunc = () => {
  const conv = new lab.Convolutional([[1, 0, 1, 0], [1, 1, 1, 0]]);

  expect(conv.outputFunc).to.eql([[1, 0, 1, 0], [1, 1, 1, 0]]);
  expect(conv.state).to.eql([0, 0, 0, 0]);
  expect(conv.symbol).to.equal('4.10.14');
};

const rejCreateWFuncForNonBinVals = () => {
  expect(() => new lab.Convolutional([[1, 2, 1, 0], [1, 1, 1, 0]])).to.throw(
    'Only binary inputs allowed.'
  );
};

const createWSym = () => {
  const conv = new lab.Convolutional('4.10.14');

  expect(conv.symbol).to.equal('4.10.14');
  expect(conv.outputFunc).to.eql([[1, 0, 1, 0], [1, 1, 1, 0]]);
  expect(conv.state).to.eql([0, 0, 0, 0]);
};

const encode = () => {
  const conv = new lab.Convolutional('4.10.14');
  expect(conv.encodeOne(1)).to.eql([1, 1]);
};

const encodeAll = () => {
  const conv = new lab.Convolutional('4.10.14');
  expect(conv.encodeAll([1, 0, 0, 1])).to.eql([[1, 1], [0, 1], [1, 1], [1, 1]]);
};

const decode = () => {
  const conv = new lab.Convolutional('4.10.14');
  expect(conv.decode([[1, 1], [1, 0], [1, 0], [0, 0]])).to.eql([1, 1, 0, 1]);
};

const rejDecodeForInvOutsNum = () => {
  const conv = new lab.Convolutional('4.10.14');
  expect(() => conv.decode([[1, 1, 1], [1, 0], [1, 0], [0, 0]])).to.throw(
    'Invalid number of outputs.'
  );
};

const rejDecodeForNonBinOp = () => {
  const conv = new lab.Convolutional('4.10.14');
  expect(() => conv.decode([[1, 2], [3, 0], [1, 0], [0, 0]])).to.throw(
    'Only binary inputs allowed.'
  );
};

const correct = () => {
  const conv = new lab.Convolutional('4.10.14.12');

  expect(
    conv.correct([
      [1, 0, 1],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
      [0, 0, 0],
      [0, 1, 0],
    ])
  ).to.eql([[1, 1, 1], [1, 0, 0], [1, 0, 1], [0, 0, 1], [1, 0, 0], [0, 1, 0]]);
};

const setState = () => {
  const conv = new lab.Convolutional('4.10.14.12');
  const x = [0, 1, 1, 0];
  conv.state = x.slice(0);
  expect(conv.state).to.eql(x);
};

const computeWeights = () => {
  expect(
    lab.Convolutional.computeWeights(
      [1, 1, 1],
      [[1, 1, 0], [0, 0, 1], [0, 0, 0]]
    )
  ).to.eql([1, 2, 3]);
};

const rejComputeWeightsForDiffLens = () => {
  expect(() =>
    lab.Convolutional.computeWeights(
      [1, 1, 1, 1],
      [[1, 1, 0], [0, 0, 1], [0, 0, 0]]
    )
  ).to.throw('Arrays must be of equal length.');
};

const padLeft = () => {
  expect(lab.Convolutional.padLeft('hello', 10, '0')).to.equal('00000hello');
};

const rejPadLeftAboveWidth = () => {
  expect(() => lab.Convolutional.padLeft('hello', 2, '0')).to.throw(
    'Width must be larger than the string.'
  );
};

module.exports = {
  createWFunc,
  rejCreateWFuncForNonBinVals,
  createWSym,
  encode,
  encodeAll,
  decode,
  rejDecodeForInvOutsNum,
  rejDecodeForNonBinOp,
  correct,
  setState,
  computeWeights,
  rejComputeWeightsForDiffLens,
  padLeft,
  rejPadLeftAboveWidth,
};
