const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const fft = () => {
  const t = lab.Functions.fft([
    math.complex(2, 0),
    math.complex(4, 0),
    math.complex(8, 0),
    math.complex(0, 0),
  ]);

  expect(t).to.eql([
    math.complex(14, 0),
    math.complex(-6, -4),
    math.complex(6, 0),
    math.complex(-6, 4),
  ]);
};

const rejectFFTForNonPow2ArrLen = () => {
  expect(() => lab.Functions.fft([1, 0, 1, 0, 1])).to.throw(
    'Signal sampling frequency must be a power of 2.'
  );
};

const ifft = () => {
  const t = lab.Functions.ifft([
    math.complex(8, 0),
    math.complex(0),
    math.complex(0),
    math.complex(0),
  ]);

  expect(t).to.eql([
    math.complex(2, 0),
    math.complex(2, 0),
    math.complex(2, 0),
    math.complex(2, 0),
  ]);
};

const rejectIFFTForNonPow2ArrLen = () => {
  expect(() => lab.Functions.ifft([1, 0, 1, 0, 1])).to.throw(
    'Signal sampling frequency must be a power of 2.'
  );
};

const cconvolve = () => {
  const c = lab.Functions.cconvolve([2, 2, 2, 2], [2, 2, 2, 2]);

  expect(c).to.eql([
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
  ]);
};

const rejectCConvolveForNonPow2ArrLen = () => {
  expect(() =>
    lab.Functions.cconvolve([1, 0, 1, 0, 1], [1, 0, 1, 0, 1])
  ).to.throw('Signal sampling frequency must be a power of 2.');
};

const rejectCConvolveForLengthMismatch = () => {
  expect(() => lab.Functions.cconvolve([1, 0, 1], [0, 1])).to.throw(
    'Arrays must have equal lengths.'
  );
};

const convolve = () => {
  const t = lab.Functions.convolve([1, 0], [0, 1]);

  expect(t).to.eql([
    math.complex(0, 0),
    math.complex(1, 0),
    math.complex(0, 0),
    math.complex(0, 0),
  ]);
};

const rejectConvolveForNonPow2ArrLen = () => {
  expect(() =>
    lab.Functions.convolve([1, 0, 1, 0, 1], [1, 0, 1, 0, 1])
  ).to.throw('Signal sampling frequency must be a power of 2.');
};

const rejectConvolveForLengthMismatch = () => {
  expect(() => lab.Functions.convolve([1, 0, 1], [0, 1])).to.throw(
    'Arrays must have equal lengths.'
  );
};

const add = () => {
  const sum = lab.Functions.add([[1, 1], [2, 4], [-1, 0]]);
  expect(sum).to.eql([2, 5]);
};

const rejectAddForDiffLens = () => {
  expect(() => lab.Functions.add([[1, 1, 6], [2, 4], [-1, 0]])).to.throw(
    'Arrays must have equal lengths.'
  );
};

module.exports = {
  fft,
  rejectFFTForNonPow2ArrLen,
  ifft,
  rejectIFFTForNonPow2ArrLen,
  cconvolve,
  rejectCConvolveForNonPow2ArrLen,
  rejectCConvolveForLengthMismatch,
  convolve,
  rejectConvolveForNonPow2ArrLen,
  rejectConvolveForLengthMismatch,
  add,
  rejectAddForDiffLens,
};
