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

  public sample(Fs: number): number[] {
    if (Fs < this.Fs && this.Fs % Fs !== 0) {
      throw new Error(
        'The new sampling frequency must be a factor of the current sampling frequency if it is lower than the current sampling frequency.'
      );
    }

    if (Fs > this.Fs && Fs % this.Fs !== 0) {
      throw new Error(
        'The new sampling frequency must be a multiple of the current sampling frequency if it is higher than the current sampling frequency.'
      );
    }

    return Fs < this.Fs
        ? this._sampleLess(Fs)
        : this._sampleMore(Fs);
  }

  /**
   * Samples the signal at the given frequency higher than the
   * original frequency. For accuracy, the new sampling frequency must
   * be a multiple of the original signal sampling frequency.
   *
   * @private
   * @param {number} Fs Sampling frequency
   * @returns {number[]} Sampled signal array
   * @memberof Signal
   */
  private _sampleMore(Fs: number): number[] {
    const r: number[] = new Array(Fs);
    const k: number = Fs / this.Fs;
    for (let i = 0; i < r.length; i++) {
      r[i] = this._signal[Math.floor(i / k)];
    }

    return r;
  }

  /**
   * Samples the signal at the given frequency lower than the
   * original frequency.
   *
   * @private
   * @param {number} Fs Sampling frequency
   * @returns {number[]} Sampled signal array
   * @memberof Signal
   */
  private _sampleLess(Fs: number): number[] {
    // Get the number of samples in each division of the current array
    // to be represented by one sample in the new array
    const k: number = this.Fs / Fs;
    // Get the sample in the middle of the division, favoring the
    // earlier sample in the event of an even-length division
    return this._signal.filter((x, i) => (i + Math.floor(k / 2) + 1) % k === 0);
  }

  /**
   * Returns the frequency magnitude response of the signal
   *
   * @returns Frequency magnitude response array
   * @memberof Signal
   */
  public getFrequencyResponse() {
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
