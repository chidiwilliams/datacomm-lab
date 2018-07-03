import { Signal } from './Signal';

export class CarrierSignal extends Signal {
  private _freq: number;

  constructor(samples: number, frequency: number) {
    super(samples);

    // Generate carrier with 2*PI*frequency*ithsample
    this._freq = frequency;
    const carrier: number[] = new Array(this.getLength());
    for (let i = 0; i < carrier.length; i++) {
      carrier[i] = Math.sin((2 * Math.PI * frequency * i) / this.getLength());
    }

    this.signal = carrier;
  }

  public get freq(): number {
    return this._freq;
  }

  public set freq(freq: number) {
    this._freq = freq;
  }
}
