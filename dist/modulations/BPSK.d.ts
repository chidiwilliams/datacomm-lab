/**
 *
 *
 * @export
 * @class BPSK
 */
export declare class BPSK {
    private _baseband;
    private _carrier;
    private _modulated;
    private _demodulated;
    /**
     * Creates an instance of BPSK.
     * @param {number[]} baseband
     * @param {number[]} carrier
     * @memberof BPSK
     */
    constructor(baseband: number[], carrier: number[]);
    /**
     * Returns an array whose individual elements are the products
     * of the individual elements of the received arrays
     *
     * @private
     * @param {number[]} a
     * @param {number[]} b
     * @returns {number[]}
     * @memberof BPSK
     */
    private _multArrays;
    /**
     * Get modulated signal array
     *
     * @readonly
     * @type {number[]}
     * @memberof BPSK
     */
    readonly modulated: number[];
    /**
     * Get demodulated signal array
     *
     * @readonly
     * @type {number[]}
     * @memberof BPSK
     */
    readonly demodulated: number[];
    /**
     * Get the demodulated signal using a received signal array and
     * the previous carrier signal
     *
     * @param {number[]} rec
     * @returns {number[]}
     * @memberof BPSK
     */
    demodulate(rec: number[]): number[];
}
