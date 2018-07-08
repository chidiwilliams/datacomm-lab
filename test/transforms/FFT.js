const expect = require('chai').expect;
const math = require('mathjs');
const lab = require('../../dist');

const fft = () => {
  const t = new lab.FFT().fft([
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

const rejectFFTForOddArrayLength = () => {
  const fft = new lab.FFT();
  expect(() => fft.fft([1, 0, 1, 0, 1])).to.throw(
    'Length of input array must be a multiple of 2.'
  );
};

const ifft = () => {
  const t = new lab.FFT().ifft([
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

const rejectIFFTForOddArrayLength = () => {
  const fft = new lab.FFT();
  expect(() => fft.ifft([1, 0, 1, 0, 1])).to.throw(
    'Length of input array must be a multiple of 2.'
  );
};

const cconvolve = () => {
  const c = new lab.FFT().cconvolve([2, 2, 2, 2], [2, 2, 2, 2]);

  expect(c).to.eql([
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
  ]);
};

const rejectCConvolveForOddArrayLength = () => {
  const fft = new lab.FFT();
  expect(() => fft.cconvolve([1, 0, 1, 0, 1], [1, 0, 1, 0, 1])).to.throw(
    'Length of input arrays must be a multiple of 2.'
  );
};

const rejectCConvolveForLengthMismatch = () => {
  const fft = new lab.FFT();
  expect(() => fft.cconvolve([1, 0, 1], [0, 1])).to.throw(
    'Arrays must have equal lengths.'
  );
};

const convolve = () => {
  const t = new lab.FFT().convolve([1, 0], [0, 1]);

  expect(t).to.eql([
    math.complex(0, 0),
    math.complex(1, 0),
    math.complex(0, 0),
    math.complex(0, 0),
  ]);
};

const rejectConvolveForOddArrayLength = () => {
  const fft = new lab.FFT();
  expect(() => fft.convolve([1, 0, 1, 0, 1], [1, 0, 1, 0, 1])).to.throw(
    'Length of input arrays must be a multiple of 2.'
  );
};

const rejectConvolveForLengthMismatch = () => {
  const fft = new lab.FFT();
  expect(() => fft.convolve([1, 0, 1], [0, 1])).to.throw(
    'Arrays must have equal lengths.'
  );
};

module.exports = {
  fft,
  rejectFFTForOddArrayLength,
  ifft,
  rejectIFFTForOddArrayLength,
  cconvolve,
  rejectCConvolveForOddArrayLength,
  rejectCConvolveForLengthMismatch,
  convolve,
  rejectConvolveForOddArrayLength,
  rejectConvolveForLengthMismatch,
};
