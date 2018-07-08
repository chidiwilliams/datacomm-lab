import * as math from 'mathjs';
import { Signal } from './Signal';

/**
 *
 *
 * @export
 * @class ComplexSignal
 * @extends {Signal}
 */
export class ComplexSignal extends Signal {
  private _jSignal: math.Complex[];

  /**
   *Creates an instance of ComplexSignal.
   * @param {number} samples
   * @param {math.Complex[]} signal
   * @memberof ComplexSignal
   */
  constructor(samples: number, signal: math.Complex[]) {
    super(samples);
    this._jSignal = signal;
  }

  /**
   * Returns the complex signal array.
   *
   * @type {math.Complex[]}
   * @memberof ComplexSignal
   */
  public get jSignal(): math.Complex[] {
    return this._jSignal;
  }

  /**
   * Sets the complex signal array
   *
   * @memberof ComplexSignal
   */
  public set jSignal(v: math.Complex[]) {
    this._jSignal = v;
  }

  /**
   * Gets the complex signal value at the index-th sample.
   *
   * @param {number} index
   * @returns {math.Complex} Complex signal array
   * @memberof ComplexSignal
   */
  public getJSignalValue(index: number): math.Complex {
    return this._jSignal[index];
  }

  /**
   * Returns an array corresponding to the magnitudes of each value in the complex signal.
   *
   * @returns {number[]} Magnitude array
   * @memberof ComplexSignal
   */
  public magnitude(): number[] {
    const m: number[] = new Array(this._jSignal.length);
    for (let i = 0; i < this._jSignal.length; i++) {
      m[i] = this._jSignal[i].toPolar().r;
    }
    return m;
  }
}
