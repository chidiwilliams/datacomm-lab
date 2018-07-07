'use strict';
const FFT = require('./transforms/FFT');
const Hamming4 = require('./codecs/Hamming4');
const AWGN = require('./impairments/AWGN');
const Signal = require('./signals/Signal');

// Signals
describe('Signal functions', () => {
  it('should compute the Frequency magnitude response', () => Signal.fRes());
});

// Utilities

// Codecs
// Hamming codec
describe('Hamming-7,4 codec functions', () => {
  it('should encode', () => Hamming4.encode());
  it('should encode and add parity bit', () => Hamming4.encodeP());
  it('should decode', () => Hamming4.decode());
  it('should correct single-bit error', () => Hamming4.correct());
});

// Impairments
// AWGN
describe('AWGN functions', () => {
  it('should generate sample with mean between -0.08 and +0.08', () =>
    AWGN.generate());
});

// FFT
describe('FFT functions', () => {
  it('should perform FFT', () => FFT.fft());
  it('should perform IFFT', () => FFT.ifft());
  it('should perform Circular Convolution', () => FFT.cconvolve());
  it('should perform Convolution', () => FFT.convolve());
});
