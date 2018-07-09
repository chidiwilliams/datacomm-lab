'use strict';
const FFT = require('./transforms/FFT');
const Hamming4 = require('./codecs/Hamming4');
const AWGN = require('./impairments/AWGN');
const Signal = require('./signals/Signal');
const BPSK = require('./modulations/BPSK');

// Signals

// Signal
describe('Signal functions', () => {
  it('should create empty Signal array', () => Signal.create());
  it('should set Signal array', () => Signal.setSignal());
  it('should not set Signal array with an array of a different length', () =>
    Signal.rejectSetSignalForChangeLen());
  it('should get Signal array value at an index', () =>
    Signal.getSignalValue());
  it('should set Signal array value at an index', () =>
    Signal.setSignalValue());
  it('should sample a signal at a lower sampling frequency', () =>
    Signal.sampleLower());
  it('should not sample a signal if the new sampling frequency is lower and not a factor of the current sampling frequency', () =>
    Signal.rejectSampleLowerForNonFactFreq());
  it('should sample a signal at a higher sampling frequency', () =>
    Signal.sampleHigher());
  it('should not sample a signal if the new sampling frequency is lower and not a factor of the current sampling frequency', () =>
    Signal.rejectSampleHigherForNonMultFreq());
  it('should compute the Frequency magnitude response', () => Signal.fRes());
  it('should not compute the Frequency magnitude response if the sampling frequency is not a power of 2', () =>
    Signal.rejectFResForNonPow2Fs());
});

// Wave Signal

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
  it('should not perform FFT if array length is not a power of 2', () =>
    FFT.rejectFFTForNonPow2ArrLen());
  it('should perform IFFT', () => FFT.ifft());
  it('should not perform IFFT if array length is not a power of 2', () =>
    FFT.rejectIFFTForNonPow2ArrLen());
  it('should perform Circular Convolution', () => FFT.cconvolve());
  it('should not perform Circular Convolution if the sampling frequency of the signals is not a power of 2', () =>
    FFT.rejectCConvolveForNonPow2ArrLen());
  it('should not perform Circular Convolution of two arrays of different lengths', () =>
    FFT.rejectCConvolveForLengthMismatch());
  it('should perform Convolution', () => FFT.convolve());
  it('should not perform Convolution if the sampling frequency of the signals is not a power of 2', () =>
    FFT.rejectConvolveForNonPow2ArrLen());
  it('should not perform Convolution of two arrays of different lengths', () =>
    FFT.rejectConvolveForLengthMismatch());
});
