/**
 *
 *
 * @export
 * @class AWGN
 */
export class AWGN {
  private _amp: number = 1;
  private _noise: number[];

  /**
   * Creates an instance of AWGN.
   * @param {number} numSamples
   * @param {number} [amplitude]
   * @memberof AWGN
   */
  constructor(numSamples: number, amplitude?: number) {
    if (!amplitude) {
      amplitude = 1;
    }

    this._noise = new Array(numSamples);

    for (let i = 0; i < this._noise.length; i++) {
      this._noise[i] = this.nextGaussian() * amplitude;
    }
  }

  /**
   * Generates new Gaussian random number
   *
   * @returns {number}
   * @memberof AWGN
   */
  public nextGaussian(): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  /**
   * Get the noise amplitude
   *
   * @readonly
   * @type {number}
   * @memberof AWGN
   */
  public get amplitude(): number {
    return this._amp;
  }

  /**
   * Get the noise array
   *
   * @readonly
   * @type {number[]}
   * @memberof AWGN
   */
  public get noise(): number[] {
    return this._noise;
  }
}
