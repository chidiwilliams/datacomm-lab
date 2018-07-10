export class Hamming4 {
  private static GEN_MATRIX: number[][] = [
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  private static CHECK_MATRIX: number[][] = [
    [1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 1, 1],
  ];
  private static DECODE_MATRIX: number[][] = [
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
  ];

  /**
   * Checks if input array contains only binary values.
   * Returns true if array is binary, else throws error.
   *
   * @private
   * @param {number[]} m Input array
   * @returns {boolean}
   * @memberof Hamming4
   */
  private _isArrayBinary(m: number[]): boolean {
    for (let i = 0; i < m.length; i++) {
      if (m[i] !== 0 && m[i] !== 1) {
        throw new Error('Input array must contain only zeros and ones.');
      }
    }
    return true;
  }

  public encode(m: number[], par?: boolean): number[] {
    if (m.length !== 4) {
      throw new Error('Input array must have a length of 4.');
    }

    this._isArrayBinary(m);

    // Do Hamming
    const out: number[] = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 4; j++) {
        out[i] += Hamming4.GEN_MATRIX[i][j] * m[j];
      }
      out[i] = out[i] % 2;
    }

    // Compute parity bit
    let s: number = 0;
    for (let i = 0; i < out.length; i++) {
      s += out[i];
    }
    const p = s % 2 === 0 ? 0 : 1;

    return par ? out.concat(p) : out;
  }

  public decode(rec: number[]): number[] {
    if (rec.length !== 7) {
      throw new Error('Input array must have a length of 7.');
    }

    this._isArrayBinary(rec);

    // Correct received matrix
    const cor: number[] = this.correct(rec);

    // Decode the bits to reclaim the original four-bit array
    const dec: number[] = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 7; j++) {
        dec[i] += Hamming4.DECODE_MATRIX[i][j] * cor[j];
      }
    }

    return dec;
  }

  public correct(rec: number[]): number[] {
    if (rec.length !== 7) {
      throw new Error('Input array must have a length of 7.');
    }

    this._isArrayBinary(rec);

    // Get bit position at which error occured
    const errBit = this._getErrorBit(rec);
    // If bit position >= 0, switch bit at that position
    if (errBit >= 0) {
      rec[errBit] = rec[errBit] === 0 ? 1 : 0;
    }
    return rec;
  }

  private _getErrorBit(rec: number[]): number {
    // Get the syndrome matrix
    const syn = this._getSyndrome(rec);

    let err = -1;
    for (let i = 0; i < syn.length; i++) {
      err += syn[i] * Math.pow(2, 2 - i);
    }

    return err;
  }

  private _getSyndrome(rec: number[]): number[] {
    const syn: number[] = [0, 0, 0];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 7; j++) {
        syn[2 - i] += Hamming4.CHECK_MATRIX[i][j] * rec[j];
      }
      syn[2 - i] = syn[2 - i] % 2;
    }

    return syn;
  }
}
