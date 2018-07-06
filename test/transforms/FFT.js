'use strict';
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

const cconvolve = () => {
  const c = new lab.FFT().cconvolve([2, 2, 2, 2], [2, 2, 2, 2]);

  expect(c).to.eql([
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
    math.complex(16, 0),
  ]);
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

module.exports = {
  fft,
  ifft,
  cconvolve,
  convolve,
};
