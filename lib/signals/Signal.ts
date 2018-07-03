export class Signal {
  private _signal: number[];
  private _name: string = 'Signal';

  constructor(samples: number) {
    // Generates a 0-filled array of length 'samples'
    this._signal = new Array(samples + 1)
      .join('0')
      .split('')
      .map(parseFloat);
  }

  public get signal(): number[] {
    return this._signal;
  }

  public set signal(signal: number[]) {
    if (signal.length !== this._signal.length) {
      throw new Error('Invalid signal length');
    }

    this._signal = signal;
  }

  public getSignalValue(index: number) {
    return this._signal[index];
  }

  public setSignalValue(index: number, value: number) {
    this._signal[index] = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public getLength() {
    return this._signal.length;
  }

  public print(header: string, printMode: number): void {
    console.log(header);
    for (let i = 0; i < this.signal.length; i++) {
      const value = this.signal[i];

      if (printMode === 0) {
        console.log(value + ' ');
      } else if (printMode === 1) {
        console.log(value);
      } else {
        console.log(`${i}. ` + value);
      }
    }
  }

  public getThresholds(numThresh: number): number[] {
    if (numThresh > this.signal.length) {
      throw new Error(
        'Number of thresholds must be less than number of samples'
      );
    }

    const thresholds: number[] = [];
    const points: number[] = [];

    // Get threshold points
    const beginning = Math.ceil(
      Math.floor(this.signal.length / numThresh / 2) - 1
    );
    const width = Math.ceil(Math.floor(this.signal.length / numThresh));

    for (let i = 0; i < numThresh; i++) {
      points[i] = width * i + beginning;
    }

    // Get thresholds
    for (let i = 0; i < numThresh; i++) {
      const point = points[i];
      thresholds[i] = this.signal[point] > 0 ? 1 : 0;
    }

    return thresholds;
  }
}
