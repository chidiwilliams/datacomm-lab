import { expect } from 'chai';
import math from 'mathjs';
import { Functions } from './Functions';

describe('Signal functions tests', () => {
  it('should perform FFT', () => {
    const t = Functions.fft([
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
  });

  it('should not perform FFT if array length is not a power of 2', () => {
    expect(() =>
      Functions.fft([
        math.complex(1, 0),
        math.complex(0, 0),
        math.complex(1, 0),
        math.complex(0, 0),
        math.complex(1, 0),
      ]),
    ).to.throw('Signal sampling frequency must be a power of 2.');
  });

  it('should perform IFFT', () => {
    const t = Functions.ifft([
      math.complex(8, 0),
      math.complex(0, 0),
      math.complex(0, 0),
      math.complex(0, 0),
    ]);

    expect(t).to.eql([
      math.complex(2, 0),
      math.complex(2, 0),
      math.complex(2, 0),
      math.complex(2, 0),
    ]);
  });

  it('should not perform IFFT if array length is not a power of 2', () => {
    expect(() =>
      Functions.ifft([
        math.complex(1, 0),
        math.complex(0, 0),
        math.complex(1, 0),
        math.complex(0, 0),
        math.complex(1, 0),
      ]),
    ).to.throw('Signal sampling frequency must be a power of 2.');
  });

  it('should perform Circular Convolution', () => {
    const c = Functions.cconvolve(
      [
        math.complex(2, 0),
        math.complex(2, 0),
        math.complex(2, 0),
        math.complex(2, 0),
      ],
      [
        math.complex(2, 0),
        math.complex(2, 0),
        math.complex(2, 0),
        math.complex(2, 0),
      ],
    );

    expect(c).to.eql([
      math.complex(16, 0),
      math.complex(16, 0),
      math.complex(16, 0),
      math.complex(16, 0),
    ]);
  });

  it('should not perform Circular Convolution if the sampling frequency of the signals is not a power of 2', () => {
    expect(() =>
      Functions.cconvolve(
        [
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
        ],
        [
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
        ],
      ),
    ).to.throw('Signal sampling frequency must be a power of 2.');
  });

  it('should not perform Circular Convolution of two arrays of different lengths', () => {
    expect(() =>
      Functions.cconvolve(
        [math.complex(1, 0), math.complex(0, 0), math.complex(1, 0)],
        [math.complex(0, 0), math.complex(1, 0)],
      ),
    ).to.throw('Arrays must have equal lengths.');
  });

  it('should perform Convolution', () => {
    const t = Functions.convolve(
      [math.complex(1, 0), math.complex(0, 0)],
      [math.complex(0, 0), math.complex(1, 0)],
    );

    expect(t).to.eql([
      math.complex(0, 0),
      math.complex(1, 0),
      math.complex(0, 0),
      math.complex(0, 0),
    ]);
  });

  it('should not perform Convolution if the sampling frequency of the signals is not a power of 2', () => {
    expect(() =>
      Functions.convolve(
        [
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
        ],
        [
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
          math.complex(0, 0),
          math.complex(1, 0),
        ],
      ),
    ).to.throw('Signal sampling frequency must be a power of 2.');
  });

  it('should not perform Convolution of two arrays of different lengths', () => {
    expect(() =>
      Functions.convolve(
        [math.complex(1, 0), math.complex(0, 0), math.complex(1, 0)],
        [math.complex(0, 0), math.complex(1, 0)],
      ),
    ).to.throw('Arrays must have equal lengths.');
  });

  it('should perform addition of multiple arrays', () => {
    const sum = Functions.add([
      [1, 1],
      [2, 4],
      [-1, 0],
    ]);
    expect(sum).to.eql([2, 5]);
  });

  it('should not perform addition of multiple arrays with different lengths', () => {
    expect(() =>
      Functions.add([
        [1, 1, 6],
        [2, 4],
        [-1, 0],
      ]),
    ).to.throw('Arrays must have equal lengths.');
  });
});
