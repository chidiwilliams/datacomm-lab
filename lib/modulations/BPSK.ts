export class BPSK {
  private _baseband: number[];
  private _carrier: number[];
  private _modulated: number[];
  private _demodulated: number[];

  constructor(baseband: number[], carrier: number[]) {
    if (baseband.length !== carrier.length) {
      throw new Error('Baseband and carrier must have the same length');
    }
    this._baseband = baseband;
    this._carrier = carrier;

    // Shift phase
    for (let i = 0; i < baseband.length; i++) {
      this._baseband[i] = this._baseband[i] === 1 ? 1 : -1;
    }

    this._modulated = this.multArrays(this._baseband, this._carrier);
    this._demodulated = this.multArrays(this._modulated, this._carrier);
  }

  public multArrays(a: number[], b: number[]): number[] {
    if (a.length !== b.length) {
      throw new Error('Arrays must have the same length');
    }

    const c = new Array(a.length + 1)
      .join('0')
      .split('')
      .map(parseFloat);

    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] * b[i];
    }

    return c;
  }

  public get modulated(): number[] {
    return this._modulated;
  }

  public get demodulated(): number[] {
    return this._demodulated;
  }

  public demodulate(rec: number[]): number[] {
    if (rec.length != this._demodulated.length) {
      throw new Error('Invalid array length');
    }

    return this.multArrays(rec, this._carrier);
  }
}
