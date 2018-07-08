/**
 *
 *
 * @export
 * @class AWGN
 */
export declare class AWGN {
    /**
     * Get the noise array
     *
     * @param {number} numSamples
     * @param {number} [amp]
     * @returns {number[]}
     * @memberof AWGN
     */
    generate(numSamples: number): number[];
    /**
     * Generates new Gaussian random number
     *
     * @returns {number}
     * @memberof AWGN
     */
    private next;
}
