const expect = require('chai').expect;
const lab = require('../../dist');

const bpskMod = () => {
  const bpsk = new lab.BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
  expect(bpsk.modulated).to.be.eql([0, -1, 0, 1]);
};

const rejectBpskModForLenMismatch = () => {
  expect(() => new lab.BPSK([1, 0, 1, 0], [0, 1, 0, -1, 0])).to.throw(
    'Baseband and carrier must have the same length.'
  );
};

const rejectBpskModForNonBinaryBB = () => {
  expect(() => new lab.BPSK([1, 2, 1, 0], [0, 1, -1, 0])).to.throw(
    'Baseband signal must contain only binary values.'
  );
};

const bpskDemod = () => {
  const bpsk = new lab.BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
  expect(bpsk.demodulated).to.be.eql([0, -1, 0, -1]);
};

const bpskGvnDemod = () => {
  const bpsk = new lab.BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
  const demod = bpsk.demodulate([0.1, -0.9, 0.05, 0.09]);
  expect(demod).to.be.eql([0, -0.9, 0, -0.09]);
};

const rejectBpskGvnDemodForLenMismatch = () => {
  const bpsk = new lab.BPSK([1, 0, 1, 0], [0, 1, 0, -1]);
  expect(() => bpsk.demodulate([0.1, -0.9, 0.05])).to.throw(
    'Received signal and carrier must have the same length.'
  );
};

module.exports = {
  bpskMod,
  rejectBpskModForLenMismatch,
  rejectBpskModForNonBinaryBB,
  bpskDemod,
  bpskGvnDemod,
  rejectBpskGvnDemodForLenMismatch,
};
