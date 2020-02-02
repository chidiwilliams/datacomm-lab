import { Signal } from './Signal';

/**
 *
 *
 * @export
 * @class WaveSignal
 * @extends {Signal}
 */
export class WaveSignal extends Signal {
  private _Fa: number;
  private _phi: number;

  /**
   * Creates an instance of WaveSignal. Phi (phase angle) is optional for sine wave; if not given, phase angle of 0 is used.
   * @param {WaveSignalType} type Type of wave (Sine, square or triangular)
   * @param {number} Fs Sampling frequency
   * @param {number} Fa Signal frequency
   * @param {number} [phi] Phase angle
   * @memberof WaveSignal
   */
  constructor(type: WaveSignalType, Fs: number, Fa: number, phi?: number) {
    if (Fa >= Fs / 2) {
      throw new Error(
        'Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)',
      );
    }

    super(Fs);

    this._Fa = Fa;
    this._phi = phi || 0;

    this.signal =
      type === WaveSignalType.SINE
        ? this._generateSine()
        : type === WaveSignalType.SQUARE
        ? this._generateSquare()
        : this._generateTriangular();
  }

  /**
   * Generates a sine wave signal
   *
   * @private
   * @returns {number[]} Samples
   * @memberof WaveSignal
   */
  private _generateSine(): number[] {
    return Array.apply(null, Array(this.Fs)).map((x: any, i: any) =>
      Math.sin((2 * Math.PI * this._Fa * i) / this.Fs + this._phi),
    );
  }

  /**
   * Generates a square wave signal
   *
   * @private
   * @returns {number[]} Samples
   * @memberof WaveSignal
   */
  private _generateSquare(): number[] {
    const carr: number[] = Array.apply(null, Array(this.Fs)).map(() => 0);
    for (let i = 0; i < this._Fa; i++) {
      // Divide the samples by the number of repeating signal units (frequency, Fa)
      const k: number = this.Fs / this._Fa;
      // For each division, from start to half of the frequency limit, put 1s, while the other half samples remain zeros
      for (let j = Math.ceil(k * i); j < Math.ceil(k * (i + 0.5)); j++) {
        carr[j] = 1;
      }
    }
    return carr;
  }

  /**
   * Generates a triangular wave signal
   *
   * @private
   * @returns {number[]} Samples
   * @memberof WaveSignal
   */
  private _generateTriangular(): number[] {
    const carr: number[] = Array.apply(null, Array(this.Fs)).map(() => 0);
    // For each frequency division...
    for (let i = 0; i < this._Fa; i++) {
      const k: number = this.Fs / this._Fa;
      // Get the first sample of the division
      const sample1: number = Math.ceil(k * i);
      // Get the range divisions of the frequency
      const range: number = Math.ceil(k);
      const halfRange: number = Math.ceil(0.5 * k);
      const quarterRange: number = Math.ceil(0.25 * k);
      // From start to one-quarter of the range, store each sample as a rising gradient from 0 to 1
      for (let j = sample1; j < sample1 + quarterRange; j++) {
        carr[j] = (j - sample1) / quarterRange;
      }
      // From one-quarter to half of the range, store each sample as a falling gradient from 1 to 0
      for (let j = sample1 + quarterRange; j < sample1 + halfRange; j++) {
        carr[j] = (-1 * (j - (sample1 + quarterRange))) / quarterRange + 1;
      }
      // From half to three-quarters of the range, store each sample as a falling gradient from 0 to -1
      for (
        let j = sample1 + halfRange;
        j < sample1 + halfRange + quarterRange;
        j++
      ) {
        carr[j] = (-1 * (j - (sample1 + halfRange))) / quarterRange;
      }
      // From three-quarters to end of the range, store each sample as a rising gradient from -1 to 0
      for (
        let j = sample1 + halfRange + quarterRange;
        j < sample1 + range;
        j++
      ) {
        carr[j] = (j - (sample1 + halfRange + quarterRange)) / quarterRange - 1;
      }
    }
    return carr;
  }
}

export enum WaveSignalType {
  'SINE',
  'SQUARE',
  'TRIANGULAR',
}
