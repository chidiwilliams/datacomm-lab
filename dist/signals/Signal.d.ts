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
    /**
     * Returns the signal sampled at the given frequency. If the new
     * sampling frequency is higher than the current signal sampling
     * frequency, it must be a multiple of the current signal sampling
     * frequency. If it is lower, it must be a factor of the current
     * signal sampling frequency.
     *
     * @param {number} Fs New sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    sample(Fs: number): number[];
    /**
     * Returns the frequency magnitude response of the signal
     *
     * @returns Frequency magnitude response array
     * @memberof Signal
     */
    getFrequencyResponse(): number[];
}
