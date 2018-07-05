'use strict';
const expect = require('chai').expect;
const math = require('mathjs');
const { FFT } = require('../../dist');

function arrEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error('Unequal array lengths');
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const fft = () => {
  const t = new FFT()
    .fft([2, 4, 8, 0])
    .toString()
    .split(',');

  expect(arrEqual(t, ['14', '-6 - 4i', '6', '-6 + 4i'])).to.be.true;
};

const ifft = () => {
  const t = new FFT()
    .ifft([
      math.complex(10, 0),
      math.complex(-4, 2),
      math.complex(-2, 0),
      math.complex(-4, -2),
    ])
    .toString()
    .split(',');

  expect(
    arrEqual(t, [
      '0',
      '2 + 6.123233995736766e-17i',
      '4',
      '4 - 6.123233995736766e-17i',
    ])
  ).to.be.true;
};

const cconvolve = () => {
  const c = new FFT()
    .cconvolve([0, 2, 4, 8], [0, 2, 4, 8])
    .toString()
    .split(',');

  expect(
    arrEqual(c, [
      '48 - 1.7763568394002505e-15i',
      '64 - 5.813977392766985e-16i',
      '68 + 1.7763568394002505e-15i',
      '16 + 5.813977392766985e-16i',
    ])
  ).to.be.true;
};

const convolve = () => {
  const t = new FFT()
    .convolve([0, 2, 4, 8], [0, 2, 4, 8])
    .toString()
    .split(',');

  expect(
    arrEqual(t, [
      '-3.552713678800501e-15 - 6.217248937900877e-15i',
      '-3.84341254843885e-15i',
      '4 - 8.275650603793457e-16i',
      '16 + 3.3993233385887874e-15i',
      '48 + 4.440892098500626e-15i',
      '64 + 3.262014809162152e-15i',
      '64 + 2.603921899779596e-15i',
      '-2.8179255993120893e-15i',
    ])
  ).to.be.true;
};

module.exports = {
  fft,
  ifft,
  cconvolve,
  convolve,
};
