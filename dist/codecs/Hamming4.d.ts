export declare class Hamming4 {
    private static GEN_MATRIX;
    private static CHECK_MATRIX;
    private static DECODE_MATRIX;
    /**
     * Checks if input array contains only binary values.
     * Returns true if array is binary, else throws error.
     *
     * @private
     * @param {number[]} m Input array
     * @returns {boolean}
     * @memberof Hamming4
     */
    private _isArrayBinary;
    encode(m: number[], par?: boolean): number[];
    decode(rec: number[]): number[];
    correct(rec: number[]): number[];
    private _getErrorBit;
    private _getSyndrome;
}
