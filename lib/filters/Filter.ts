export class Filter {
  private _m_filt_t: FilterType;
  private _m_num_taps: number;
  private _m_error_flag: number;
  private _m_Fs: number;
  private _m_Fx: number = 0;
  private _m_lambda: number = 0;
  private _m_taps: number[];
  private _m_sr: number[];

  // Set these values to zero for lpf/hpf filters
  private _m_Fu: number = 0;
  private _m_phi: number = 0;

  private static MAX_NUM_FILTER_TAPS = 1000;

  constructor(
    filt_t: FilterType,
    num_taps: number,
    Fs: number,
    Fx: number | FilterFreq
  ) {
    this._m_error_flag = 0;
    this._m_filt_t = filt_t;
    this._m_Fs = Fs;
    this._m_num_taps = num_taps;

    this._m_taps = new Array(this._m_num_taps);
    this._m_sr = new Array(this._m_num_taps);

    if (Fs <= 0) {
      this._m_error_flag = -1;
      return;
    }

    if (num_taps <= 0 || num_taps > Filter.MAX_NUM_FILTER_TAPS) {
      this._m_error_flag = -3;
      return;
    }

    if (filt_t === FilterType.LPF || filt_t === FilterType.HPF) {
      if (typeof Fx === 'object') {
        // TODO: Flag appropriately
        return;
      }

      if (Fx <= 0 || Fx >= Fs / 2) {
        this._m_error_flag = -2;
        return;
      }

      this._m_Fx = Fx;
      this._m_lambda = (Math.PI * Fx) / (Fs / 2);
    } else {
      if (typeof Fx === 'number') {
        // TODO: Flag appropriately
        return;
      }

      if (Fx.Fl <= 0 || Fx.Fl >= Fs / 2 || Fx.Fu <= 0 || Fx.Fu >= Fs / 2) {
        this._m_error_flag = -2;
        return;
      }

      // Check if array has only two elements
      // Check if elem1 < elem2

      this._m_Fx = Fx.Fl;
      this._m_Fu = Fx.Fu;
      this._m_lambda = (Math.PI * Fx.Fl) / (Fs / 2);
      this._m_phi = (Math.PI * Fx.Fu) / (Fs / 2);
    }

    // Initialize shift registers
    for (let i = 0; i < this._m_num_taps; i++) {
      this._m_sr[i] = 0;
    }

    // Design filter
    if (filt_t === FilterType.LPF) {
      this.designLPF();
    } else if (filt_t === FilterType.HPF) {
      this.designHPF();
    } else {
      this.designBPF();
    }
  }

  private designLPF() {
    for (let n = 0; n < this._m_num_taps; n++) {
      const mm = n - (this._m_num_taps - 1.0) / 2.0;
      if (mm === 0) {
        this._m_taps[n] = this._m_lambda / Math.PI;
      } else {
        this._m_taps[n] = Math.sin(mm * this._m_lambda) / (mm * Math.PI);
      }
    }
  }

  private designHPF() {
    for (let n = 0; n < this._m_num_taps; n++) {
      const mm = n - (this._m_num_taps - 1.0) / 2.0;
      if (mm === 0) {
        this._m_taps[n] = 1.0 - this._m_lambda / Math.PI;
      } else {
        this._m_taps[n] = -Math.sin(mm * this._m_lambda) / (mm * Math.PI);
      }
    }
  }

  private designBPF() {
    for (let n = 0; n < this._m_num_taps; n++) {
      const mm = n - (this._m_num_taps - 1.0) / 2.0;
      if (mm === 0) {
        this._m_taps[n] = (this._m_phi - this._m_lambda) / Math.PI;
      } else {
        this._m_taps[n] =
          (Math.sin(mm * this._m_phi) - Math.sin(mm * this._m_lambda)) /
          (mm * Math.PI);
      }
    }
  }

  public do_sample(data_sample: number): number {
    if (this._m_error_flag !== 0) {
      return 0;
    }

    // Shift register values
    for (let i = this._m_num_taps - 1; i >= 1; i--) {
      this._m_sr[i] = this._m_sr[i - 1];
    }

    // Set first register value to sample number
    this._m_sr[0] = data_sample;

    let result = 0;
    for (let i = 0; i < this._m_num_taps; i++) {
      result += this._m_sr[i] * this._m_taps[i];
    }

    return result;
  }

  public get errorFlag(): number {
    return this._m_error_flag;
  }

  public get taps(): number[] {
    return this._m_taps;
  }
}

export enum FilterType {
  'BPF',
  'LPF',
  'HPF',
}

interface FilterFreq {
  Fl: number;
  Fu: number;
}
