/**
 *
 *
 * @export
 * @class Signal
 */
export declare class Signal {
    private _signal;
    /**
     * Creates an instance of Signal.
     * @param {number} Fs Sampling frequency
     * @memberof Signal
     */
    constructor(Fs: number);
    /**
     * Get the signal array
     *
     * @type {number[]}
     * @memberof Signal
     */
    /**
    * Set the signal array
    *
    * @memberof Signal
    */
    signal: number[];
    /**
     * Get the sampling frequency given as the length of the signal
     *
     * @readonly
     * @type {number}
     * @memberof Signal
     */
    readonly Fs: number;
    /**
     * Get the value of the signal at a sample value
     *
     * @param {number} index
     * @returns
     * @memberof Signal
     */
    getSignalValue(index: number): number;
    /**
     * Set the value of the signal at a sample value
     *
     * @param {number} index
     * @param {number} value
     * @memberof Signal
     */
    setSignalValue(index: number, value: number): void;
    sample(Fs: number): number[];
    /**
     * Samples the signal at the given frequency higher than the
     * original frequency. For accuracy, the new sampling frequency must
     * be a multiple of the original signal sampling frequency.
     *
     * @private
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    private _sampleMore;
    /**
     * Samples the signal at the given frequency lower than the
     * original frequency.
     *
     * @private
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    private _sampleLess;
    /**
     * Returns the frequency magnitude response of the signal
     *
     * @returns Frequency magnitude response array
     * @memberof Signal
     */
    getFrequencyResponse(): number[];
}
