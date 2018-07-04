/**
 * Helper functions for arrays
 *
 * @export
 * @class ArrayFunctions
 */
export default class ArrayFunctions {
  /**
   * Returns an array containing the addition of each respecitve element of the
   * input arrays.
   *
   * @param {number[]} a Array 1
   * @param {number[]} b Array 2
   * @returns {number[]} Array of additions
   * @memberof ArrayFunctions
   */
  public add(a: number[], b: number[]): number[] {
    if (a.length !== b.length) {
      throw new Error('Arrays must be of equal length');
    }

    const c = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + b[i];
    }

    return c;
  }
}
