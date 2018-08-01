export declare class Filter {
    private _m_filt_t;
    private _m_num_taps;
    private _m_Fs;
    private _m_Fx;
    private _m_lambda;
    private _m_taps;
    private _m_sr;
    private _m_Fu;
    private _m_phi;
    private static MAX_NUM_FILTER_TAPS;
    /**
     *Creates an instance of Filter.
     * @param {FilterType} filt_t Filter type
     * @param {number} num_taps Number of filter taps
     * @param {number} Fs Sampling frequency
     * @param {(number | FilterFreq)} Fx Cutoff frequency / frequencies
     * @memberof Filter
     */
    constructor(filt_t: FilterType, num_taps: number, Fs: number, Fx: number | FilterFreq);
    /**
     * Designs a low-pass filter
     *
     * @private
     * @memberof Filter
     */
    private designLPF;
    /**
     * Designs a high-pass filter
     *
     * @private
     * @memberof Filter
     */
    private designHPF;
    /**
     * Designs a band-pass filter
     *
     * @private
     * @memberof Filter
     */
    private designBPF;
    /**
     * Filters a single input sample.
     *
     * @param {number} samp Input sample
     * @returns {number} Filtered sample
     * @memberof Filter
     */
    do_sample(samp: number): number;
    /**
     * Filters an array of samples.
     *
     * @param {number[]} samps Array of samples
     * @returns {number[]} Array of filtered samples
     * @memberof Filter
     */
    do_sample_all(samps: number[]): number[];
    /**
     * Returns the filter taps
     *
     * @readonly
     * @type {number[]} Array of filter taps
     * @memberof Filter
     */
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
