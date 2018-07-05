'use strict';
const expect = require('chai').expect;
const math = require('mathjs');
const { FFT } = require('../dist/index');
const __FFT = require('./util/FFT');
const { Signal } = require('../dist/signals/Signal');
const { ComplexSignal } = require('../dist/signals/ComplexSignal');

describe('should create Signal', () => {
  it('should create signal', () => {
    const signal = new ComplexSignal(2048);
    expect(signal.signal).to.be.an('array');
  });
});

// Utilities

// Array Functions

// FFT
describe('FFT functions', () => {
  it('should perform FFT', () => __FFT.fft());
  it('should perform IFFT', () => __FFT.ifft());
  it('should perform Circular Convolution', () => __FFT.cconvolve());
  it('should perform Convolution', () => __FFT.convolve());
});
