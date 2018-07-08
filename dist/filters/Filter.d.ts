export declare class Filter {
    private _m_filt_t;
    private _m_num_taps;
    private _m_error_flag;
    private _m_Fs;
    private _m_Fx;
    private _m_lambda;
    private _m_taps;
    private _m_sr;
    private _m_Fu;
    private _m_phi;
    private static MAX_NUM_FILTER_TAPS;
    constructor(filt_t: FilterType, num_taps: number, Fs: number, Fn: number | FilterFreq);
    private designLPF;
    private designHPF;
    private designBPF;
    do_sample(data_sample: number): number;
    readonly errorFlag: number;
    readonly taps: number[];
}
export declare enum FilterType {
    'BPF' = 0,
    'LPF' = 1,
    'HPF' = 2
}
interface FilterFreq {
    Fl: number;
    Fu: number;
}
export {};
