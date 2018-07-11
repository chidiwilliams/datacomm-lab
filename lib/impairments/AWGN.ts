/**
 *
 *
 * @export
 * @class AWGN
 */
export class AWGN {
  /**
   * Get the noise array
   *
   * @static
   * @param {number} numSamples
   * @returns {number[]}
   * @memberof AWGN
   */
  public static generate(numSamples: number): number[] {
    const n = new Array(numSamples);
    for (let i = 0; i < n.length; i++) {
      n[i] = AWGN._next();
    }

    return n;
  }

  /**
   * Generates new Gaussian random number
   *
   * @private
   * @static
   * @returns {number}
   * @memberof AWGN
   */
  private static _next(): number {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }
}
