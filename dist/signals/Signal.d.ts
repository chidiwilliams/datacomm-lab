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
    /**
     * Prints the signal array to console.
     * Setting `numbering` to true prepends 1., 2., 3., etc.
     * to the array values.
     *
     * @param {string} header
     * @param {boolean} [numbering]
     * @memberof Signal
     */
    print(header: string, numbering?: boolean): void;
    /**
     * Samples the signal at the given frequency. For accuracy,
     * the sampling frequency must be a factor of the original
     * signal sampling frequency.
     *
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    sample(Fs: number): number[];
    /**
     * Returns the threshold values per numThresh divisions of the array
     *
     * @param {number} numThresh
     * @returns {number[]}
     * @memberof Signal
     */
    getThresholds(numThresh: number): number[];
    /**
     * Returns the frequency magnitude response of the signal
     *
     * @returns Frequency magnitude response array
     * @memberof Signal
     */
    getFrequencyResponse(): number[];
}
