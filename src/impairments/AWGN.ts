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
    return Array.apply(null, Array(numSamples)).map(
      () =>
        Math.sqrt(-2.0 * Math.log(Math.random())) *
        Math.cos(2.0 * Math.PI * Math.random())
    );
  }
}
