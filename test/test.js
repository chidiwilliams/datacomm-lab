'use strict';
const FFT = require('./transforms/FFT');
const Hamming4 = require('./codecs/Hamming4');
const AWGN = require('./impairments/AWGN');
const Signal = require('./signals/Signal');
const BPSK = require('./modulations/BPSK');

// Signals
describe('Signal functions', () => {
  // it('should compute the Frequency magnitude response', () => Signal.fRes());
});

// Utilities

// Codecs

// Hamming codec
describe('Hamming-7,4 codec functions', () => {
  // Encoding
  it('should encode', () => Hamming4.encode());
  it('should encode and add parity bit', () => Hamming4.encodePlusParity());
  it('should not encode an array of length not equal to 4', () =>
    Hamming4.rejectEncodingByLength());
  it('should not encode an array with non-binary values', () =>
    Hamming4.rejectNonBinaryEncoding());

  // Decoding
  it('should decode', () => Hamming4.decode());
  it('should not decode an array of length not equal to 7', () =>
    Hamming4.rejectDecodingByLength());

  // Correction
  it('should correct single-bit zero error', () => Hamming4.correctZero());
  it('should correct single-bit one error', () => Hamming4.correctOne());
  it('should not correct an array of length not equal to 7', () =>
    Hamming4.rejectCorrectionByLength());
});

// IMPAIRMENTS

// AWGN
describe('AWGN functions', () => {
  it('should generate sample with mean between -0.08 and +0.08', () =>
    AWGN.generate());
});

// MODULATION SCHEMES

// BPSK
describe('BPSK functions', () => {
  it('should perform BPSK modulation', () => BPSK.bpskMod());
  it('should not perform BPSK modulation if baseband and carrier have different lengths', () =>
    BPSK.rejectBpskModForLenMismatch());
  it('should not perform BPSK modulation if baseband contains one or more non-binary values', () =>
    BPSK.rejectBpskModForNonBinaryBB());
  it('should perform BPSK demodulation', () => BPSK.bpskDemod());
  it('should perform BPSK demodulation with given signal', () =>
    BPSK.bpskGvnDemod());
  it('should not perform BPSK demodulation if given signal and carrier have different lengths', () =>
    BPSK.rejectBpskGvnDemodForLenMismatch());
});

// FFT
describe('FFT functions', () => {
  it('should perform FFT', () => FFT.fft());
  it('should not perform FFT of array with odd length', () =>
    FFT.rejectFFTForOddArrayLength());
  it('should perform IFFT', () => FFT.ifft());
  it('should not perform IFFT of array with odd length', () =>
    FFT.rejectIFFTForOddArrayLength());
  it('should perform Circular Convolution', () => FFT.cconvolve());
  it('should not perform Circular Convolution of arrays with odd length', () =>
    FFT.rejectCConvolveForOddArrayLength());
  it('should not perform Circular Convolution of two arrays of different lengths', () =>
    FFT.rejectCConvolveForLengthMismatch());
  it('should perform Convolution', () => FFT.convolve());
  it('should not perform Convolution of arrays with odd length', () =>
    FFT.rejectConvolveForOddArrayLength());
  it('should not perform Convolution of two arrays of different lengths', () =>
    FFT.rejectConvolveForLengthMismatch());
});
