import * as math from 'mathjs';
import { FFT } from '../';

/**
 *
 *
 * @export
 * @class Signal
 */
export class Signal {
  private _signal: number[];

  /**
   * Creates an instance of Signal.
   * @param {number} Fs Sampling frequency
   * @memberof Signal
   */
  constructor(Fs: number) {
    this._signal = new Array(Fs + 1)
      .join('0')
      .split('')
      .map(parseFloat);
  }

  /**
   * Get the signal array
   *
   * @type {number[]}
   * @memberof Signal
   */
  public get signal(): number[] {
    return this._signal;
  }

  /**
   * Set the signal array
   *
   * @memberof Signal
   */
  public set signal(signal: number[]) {
    if (signal.length !== this._signal.length) {
      throw new Error('Invalid signal length');
    }

    this._signal = signal;
  }

  /**
   * Get the sampling frequency given as the length of the signal
   *
   * @readonly
   * @type {number}
   * @memberof Signal
   */
  public get Fs(): number {
    return this._signal.length;
  }

  /**
   * Get the value of the signal at a sample value
   *
   * @param {number} index
   * @returns
   * @memberof Signal
   */
  public getSignalValue(index: number) {
    return this._signal[index];
  }

  /**
   * Set the value of the signal at a sample value
   *
   * @param {number} index
   * @param {number} value
   * @memberof Signal
   */
  public setSignalValue(index: number, value: number) {
    this._signal[index] = value;
  }

  /**
   * Samples the signal at the given frequency. For accuracy,
   * the sampling frequency must be a factor of the original
   * signal sampling frequency.
   *
   * @param {number} Fs Sampling frequency
   * @returns {number[]} Sampled signal array
   * @memberof Signal
   */
  public sample(Fs: number): number[] {
    if (Fs % this._signal.length !== 0) {
      throw new Error(
        'New sampling frequency must be a multiple of the previous sampling frequency'
      );
    }

    const r: number[] = new Array(Fs);
    const fact: number = Fs / this._signal.length;
    for (let i = 0; i < r.length; i++) {
      r[i] = this._signal[Math.floor(i / fact)];
    }

    return r;
  }

  /**
   * Returns the threshold values per numThresh divisions of the array
   *
   * @param {number} numThresh
   * @returns {number[]}
   * @memberof Signal
   */
  public getThresholds(numThresh: number): number[] {
    if (numThresh > this.signal.length) {
      throw new Error(
        'Number of thresholds must be less than number of samples'
      );
    }

    const thresholds: number[] = new Array(numThresh);
    const points: number[] = new Array(numThresh);

    // Get threshold points
    const beginning = Math.ceil(
      Math.floor(this.signal.length / numThresh / 2) - 1
    );
    const width = Math.ceil(Math.floor(this.signal.length / numThresh));

    for (let i = 0; i < numThresh; i++) {
      points[i] = width * i + beginning;
    }

    // Get thresholds
    for (let i = 0; i < numThresh; i++) {
      const point = points[i];
      thresholds[i] = this.signal[point] > 0 ? 1 : 0;
    }

    return thresholds;
  }

  /**
   * Returns the frequency magnitude response of the signal
   *
   * @returns Frequency magnitude response array
   * @memberof Signal
   */
  public getFrequencyResponse() {
    if (isNaN(this._signal[0])) {
      throw new Error('Please add a signal array first');
    }

    if (!FFT.isRadix2(this._signal.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    // Convert signal to complex array
    const comp: math.Complex[] = this._signal.map((x) => math.complex(x, 0));

    // Compute FFT
    const sigFFT: math.Complex[] = new FFT().fft(comp);

    // Compute two-sided spectrum
    const twoSSpectrum: number[] = new Array(this.signal.length);
    for (let i = 0; i < twoSSpectrum.length; i++) {
      twoSSpectrum[i] =
        math.complex(sigFFT[i]).toPolar().r / twoSSpectrum.length;
    }

    // Compute single-sided spectrum
    const sinSSpectrum: number[] = twoSSpectrum
      .slice(0, twoSSpectrum.length / 2 + 1)
      .map((x, i, arr) => (i === 0 || i === arr.length - 1 ? x : x * 2));

    return sinSSpectrum;
  }
}
