'use strict';
const Functions = require('./functions/Functions');
const Hamming4 = require('./codecs/Hamming4');
const Convolutional = require('./codecs/Convolutional');
const AWGN = require('./impairments/AWGN');
const Signal = require('./signals/Signal');
const WaveSignal = require('./signals/WaveSignal');
const BPSK = require('./modulations/BPSK');
const Filter = require('./filters/Filter');

// SIGNALS

// SIGNAL
describe('Signal tests', () => {
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

// WAVE SIGNAL
describe('Wave signal tests', () => {
  it('should generate a signal with a frequency greater than or equal to half its sampling frequency', () =>
    WaveSignal.rejectGenForFsAboveNyquist());
  it('should generate a sine wave signal', () => WaveSignal.genSine());
  it('should generate a triangular wave signal', () =>
    WaveSignal.genTriangular());
  it('should generate a square wave signal', () => WaveSignal.genSquare());
});

// CODECS

// HAMMING CODEC
describe('Hamming-7,4 codec tests', () => {
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

// CONVOLUTIONAL CODEC
describe('Convolutional codec tests', () => {
  it('should create a convolutional codec with an output function', () =>
    Convolutional.createWFunc());
  it('should create a convolutional codec with an output function with non-binary values', () =>
    Convolutional.rejCreateWFuncForNonBinVals());
  it('should create a convolutional codec with an output symbol', () =>
    Convolutional.createWSym());
  it('should encode a single input', () => Convolutional.encode());
  it('should encode an array of inputs', () => Convolutional.encodeAll());
  it('should decode an array of outputs', () => Convolutional.decode());
  it("should not decode an array of outputs if the given number of outputs do not equal the codec's number of outputs", () =>
    Convolutional.rejDecodeForInvOutsNum());
  it('should not decode an array of outputs if the given encoded array contains non-binary values', () =>
    Convolutional.rejDecodeForNonBinOp());
  it('should correct an array of outputs', () => Convolutional.correct());
  it('should set the state of the convolutional codec', () =>
    Convolutional.setState());
  it('should compute the weights between an array and other arrays', () =>
    Convolutional.computeWeights());
  it('should not compute the weights between an array and other arrays if the lengths of the arrays are not equal', () =>
    Convolutional.rejComputeWeightsForDiffLens());
  it('should left-pad a string with another string', () =>
    Convolutional.padLeft());
  it('should not left-pad a string with another string if the length of the string to be padded is greater than the given pad width', () =>
    Convolutional.rejPadLeftAboveWidth());
});

// IMPAIRMENTS

// AWGN
describe('AWGN tests', () => {
  it('should generate sample with mean between -0.08 and +0.08', () =>
    AWGN.generate());
});

// MODULATION SCHEMES

// BPSK
describe('BPSK tests', () => {
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

// Functions
describe('Signal functions tests', () => {
  it('should perform FFT', () => Functions.fft());
  it('should not perform FFT if array length is not a power of 2', () =>
    Functions.rejectFFTForNonPow2ArrLen());
  it('should perform IFFT', () => Functions.ifft());
  it('should not perform IFFT if array length is not a power of 2', () =>
    Functions.rejectIFFTForNonPow2ArrLen());
  it('should perform Circular Convolution', () => Functions.cconvolve());
  it('should not perform Circular Convolution if the sampling frequency of the signals is not a power of 2', () =>
    Functions.rejectCConvolveForNonPow2ArrLen());
  it('should not perform Circular Convolution of two arrays of different lengths', () =>
    Functions.rejectCConvolveForLengthMismatch());
  it('should perform Convolution', () => Functions.convolve());
  it('should not perform Convolution if the sampling frequency of the signals is not a power of 2', () =>
    Functions.rejectConvolveForNonPow2ArrLen());
  it('should not perform Convolution of two arrays of different lengths', () =>
    Functions.rejectConvolveForLengthMismatch());
  it('should perform addition of multiple arrays', () => Functions.add());
  it('should not perform addition of multiple arrays with different lengths', () =>
    Functions.rejectAddForDiffLens());
});

// FILTERS
describe('Filter functions', () => {
  it('should compute the filter taps', () => Filter.taps());
  it('should perform Low Pass filtering on a signal', () => Filter.LP());
  it('should perform High Pass filtering on a signal', () => Filter.HP());
  it('should perform Band Pass filtering on a signal', () => Filter.BP());
  it('it should not create a filter with a sampling frequency less than or equal to zero', () =>
    Filter.rejectCreateForZeroOrLessFs());
  it('it should not create a filter whose number of taps is less than or equal to zero or more than the maximum limit', () =>
    Filter.rejectCreateForOOBNumTaps());
  it('it should not create a Low Pass or High Pass filter if the cutoff frequency is not a number', () =>
    Filter.rejectLPHPForNonNumFs());
  it('it should not create a Low Pass or High Pass filter if the cutoff frequency is less than or equal to zero or greater than Fs / 2', () =>
    Filter.rejectLPHPForOOBFx());
  it('it should not create a Band Pass filter if Fx is not an object containing Fl and Fu', () =>
    Filter.rejectBPForIllFx());
  it('it should not create a Band Pass filter if the lower cutoff frequency is higher than the upper cutoff frequency', () =>
    Filter.rejectBPForFlHigherThanFu());
  it('it should not create a Band Pass filter if the lower cutoff frequency is less than or equal to zero or greater than Fs / 2', () =>
    Filter.rejectBPForOOBFl());
  it('it should not create a Band Pass filter if the higher cutoff frequency is less than or equal to zero or greater than Fs / 2', () =>
    Filter.rejectBPForOOBFu());
});
