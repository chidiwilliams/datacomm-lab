/**
 *
 *
 * @export
 * @class Signal
 */
export class Signal {
  private _signal: number[];

  /**
   *Creates an instance of Signal.
   * @param {number} samples
   * @memberof Signal
   */
  constructor(samples: number) {
    // Generates a 0-filled array of length 'samples'
    this._signal = new Array(samples + 1)
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
   * Prints the signal array to console.
   * Setting `numbering` to true prepends 1., 2., 3., etc.
   * to the array values.
   *
   * @param {string} header
   * @param {boolean} [numbering]
   * @memberof Signal
   */
  public print(header: string, numbering?: boolean): void {
    console.log(header);
    for (let i = 0; i < this.signal.length; i++) {
      const value = this.signal[i];

      if (numbering === true) {
        console.log(`${i}. ` + value);
      } else {
        console.log(value);
      }
    }
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

    const thresholds: number[] = [];
    const points: number[] = [];

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
}
