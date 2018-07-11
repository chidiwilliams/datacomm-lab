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
     * @static
     * @param {number} numSamples
     * @returns {number[]}
     * @memberof AWGN
     */
    static generate(numSamples: number): number[];
    /**
     * Generates new Gaussian random number
     *
     * @private
     * @static
     * @returns {number}
     * @memberof AWGN
     */
    private static _next;
}
