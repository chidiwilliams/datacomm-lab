'use strict';
const expect = require('chai').expect;
const math = require('mathjs');
const FFT = require('./util/FFT');
const Hamming4 = require('./codecs/Hamming4');
const { Signal } = require('../dist/signals/Signal');
const { ComplexSignal } = require('../dist/signals/ComplexSignal');

// Signals

// Utilities

// Codecs
describe('Hamming codec functions', () => {
  it('should perform Hamming-7,4 encoding', () => Hamming4.encode());
  it('should perform Hamming-7,4 encoding and add parity bit', () => Hamming4.encodeP());
  it('should perform Hamming-7,4 decoding', () => Hamming4.decode());
  it('should perform Hamming-7,4 single-bit error correction', () => Hamming4.correct());
});

// FFT
describe('FFT functions', () => {
  it('should perform FFT', () => FFT.fft());
  it('should perform IFFT', () => FFT.ifft());
  it('should perform Circular Convolution', () => FFT.cconvolve());
  it('should perform Convolution', () => FFT.convolve());
});
