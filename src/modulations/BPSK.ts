/**
 *
 *
 * @export
 * @class BPSK
 */
export class BPSK {
  private _baseband: number[];
  private _basebandPShifted: number[];
  private _carrier: number[];
  private _modulated: number[];
  private _demodulated: number[];

  /**
   * Creates an instance of BPSK.
   * @param {number[]} baseband
   * @param {number[]} carrier
   * @memberof BPSK
   */
  constructor(baseband: number[], carrier: number[]) {
    if (baseband.length !== carrier.length) {
      throw new Error('Baseband and carrier must have the same length.');
    }

    // Ensure baseband only contains binary values
    for (let i = 0; i < baseband.length; i++) {
      if (baseband[i] !== 0 && baseband[i] !== 1) {
        throw new Error('Baseband signal must contain only binary values.');
      }
    }

    // Shift baseband phase
    this._baseband = baseband;
    this._basebandPShifted = baseband.map((x) => (x === 1 ? 1 : -1));
    this._carrier = carrier;

    this._modulated = this._multArrays(this._basebandPShifted, this._carrier);
    this._demodulated = this._multArrays(this._modulated, this._carrier);
  }

  /**
   * Returns an array whose individual elements are the products
   * of the individual elements of the received arrays
   *
   * @private
   * @param {number[]} a
   * @param {number[]} b
   * @returns {number[]}
   * @memberof BPSK
   */
  private _multArrays(a: number[], b: number[]): number[] {
    const c = new Array(a.length);

    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] * b[i];
    }

    return c;
  }

  /**
   * Get modulated signal array
   *
   * @readonly
   * @type {number[]}
   * @memberof BPSK
   */
  public get modulated(): number[] {
    return this._modulated;
  }

  /**
   * Get demodulated signal array
   *
   * @readonly
   * @type {number[]}
   * @memberof BPSK
   */
  public get demodulated(): number[] {
    return this._demodulated;
  }

  /**
   * Get the demodulated signal using a received signal array and
   * the previous carrier signal
   *
   * @param {number[]} rec
   * @returns {number[]}
   * @memberof BPSK
   */
  public demodulate(rec: number[]): number[] {
    if (rec.length != this._demodulated.length) {
      throw new Error('Received signal and carrier must have the same length.');
    }

    return this._multArrays(rec, this._carrier);
  }
}
