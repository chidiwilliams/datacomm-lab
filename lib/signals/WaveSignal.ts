import { Signal } from './Signal';

export class WaveSignal extends Signal {
  private _Fa: number;
  private _phi: number;

  constructor(type: WaveSignalType, Fs: number, Fa: number, phi?: number) {
    if (Fa > Fs / 2) {
      throw new Error(
        'Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)'
      );
    }

    super(Fs);

    this._Fa = Fa;
    this._phi = phi || 0;

    let carr: number[] = this.signal.slice(0);

    if (type === WaveSignalType.SINE) {
      carr = carr.map((x, i) =>
        Math.sin((2 * Math.PI * this._Fa * i) / Fs + this._phi)
      );
    } else if (type === WaveSignalType.SQUARE) {
      for (let i = 0; i < Fa; i++) {
        for (
          let j = Math.ceil((Fs * i) / Fa);
          j < (Fs * i) / Fa + Fs / (Fa * 2);
          j++
        ) {
          carr[j] = 1;
        }
      }
    }

    this.signal = carr;
  }
}

export enum WaveSignalType {
  'SINE',
  'SQUARE',
  'TRIANGULAR',
}
