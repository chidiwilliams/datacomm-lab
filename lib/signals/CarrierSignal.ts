import { Signal } from './Signal';

/**
 *
 *
 * @export
 * @class CarrierSignal
 * @extends {Signal}
 */
export class CarrierSignal extends Signal {
  private _freq: number;

  /**
   * Creates an instance of CarrierSignal.
   * @param {number} Fs Sampling frequency
   * @param {number} Fa Signal frequency
   * @memberof CarrierSignal
   */
  constructor(Fs: number, Fa: number) {
    if (Fa >= Fs / 2) {
      throw new Error(
        'Carrier frequency must be less than half the sampling frequency (Fa < Fs / 2)'
      );
    }
    super(Fs);

    // Generate carrier with 2 * PI * frequency * ith-sample
    this._freq = Fa;
    const carrier: number[] = new Array(Fs);
    for (let i = 0; i < Fs; i++) {
      carrier[i] = Math.sin((2 * Math.PI * Fa * i) / Fs);
    }

    this.signal = carrier;
  }

  /**
   * Get the signal frequency
   *
   * @type {number}
   * @memberof CarrierSignal
   */
  public get freq(): number {
    return this._freq;
  }
}
