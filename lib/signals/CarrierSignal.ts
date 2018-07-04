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
   *Creates an instance of CarrierSignal.
   * @param {number} samples
   * @param {number} frequency
   * @memberof CarrierSignal
   */
  constructor(samples: number, frequency: number) {
    super(samples);

    // Generate carrier with 2*PI*frequency*ithsample
    this._freq = frequency;
    const carrier: number[] = new Array(this.signal.length);
    for (let i = 0; i < carrier.length; i++) {
      carrier[i] = Math.sin((2 * Math.PI * frequency * i) / this.signal.length);
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
