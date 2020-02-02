import * as math from 'mathjs';
import { Functions } from '../functions/Functions';

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
    this._signal = new Array(Fs);
    for (let i = 0; i < Fs; i++) {
      this._signal[i] = 0;
    }
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
      throw new Error('Invalid signal length.');
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
   * Returns the signal sampled at the given frequency. If the new
   * sampling frequency is higher than the current signal sampling
   * frequency, it must be a multiple of the current signal sampling
   * frequency. If it is lower, it must be a factor of the current
   * signal sampling frequency.
   *
   * @param {number} Fs New sampling frequency
   * @returns {number[]} Sampled signal array
   * @memberof Signal
   */
  public sample(Fs: number): number[] {
    if (Fs < this.Fs && this.Fs % Fs !== 0) {
      throw new Error(
        'The new sampling frequency must be a factor of the current sampling frequency if it is lower than the current sampling frequency.',
      );
    }

    if (Fs > this.Fs && Fs % this.Fs !== 0) {
      throw new Error(
        'The new sampling frequency must be a multiple of the current sampling frequency if it is higher than the current sampling frequency.',
      );
    }

    // Initialize array with zeros for mapping
    let r: number[] = new Array(Fs + 1)
      .join('0')
      .split('')
      .map(parseFloat);

    const k: number = this.Fs / Fs;

    return Fs < this.Fs
      ? // Samples the signal at the given frequency lower than the
        // original frequency.
        // Get the sample in the middle of the division, favoring the
        // earlier sample in the event of an even-length division
        this._signal.filter((x, i) => (i + Math.floor(k / 2) + 1) % k === 0)
      : // Samples the signal at the given frequency higher than the
        // original frequency.
        // Repeat each sample in array for every sample in the each division
        r.map((x, i) => this._signal[Math.floor(i * k)]);
  }

  /**
   * First, samples the signal at the value specified by num_thresh. Then,
   * resamples the new signal at the original signal sampling frequency, and
   * converts each value to 1 (if the value is greater than 0) or 0 (if the
   * value is less than or equal to zero).
   *
   * @param {number} num_thresh Number of threshold points to represent
   * @returns {number[]} Binary thresholds array
   * @memberof Signal
   */
  public getBinaryThresholds(num_thresh: number): number[] {
    const samp = new Signal(num_thresh);
    samp.signal = this.sample(num_thresh);
    return samp.sample(this.Fs).map((x, i) => (x > 0 ? 1 : 0));
  }

  /**
   * Returns the frequency magnitude response of the signal
   *
   * @returns Frequency magnitude response array
   * @memberof Signal
   */
  public getFrequencyResponse() {
    if (!Functions.isRadix2(this._signal.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    // Convert signal to complex array
    const comp: math.Complex[] = this._signal.map((x) => math.complex(x, 0));

    // Compute FFT
    const sigFFT: math.Complex[] = Functions.fft(comp);

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
