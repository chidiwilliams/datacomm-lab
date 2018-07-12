/**
 * Convolutional encoder and decoder
 *
 * @export
 * @class Convolutional
 */
export declare class Convolutional {
    /**
     * Convolutional encoder state
     *
     * @private
     * @type {number[]}
     * @memberof Convolutional
     */
    private _state;
    /**
     * Convolutional coded output function
     *
     * @private
     * @type {number[][]}
     * @memberof Convolutional
     */
    private _outFn;
    /**
     * Convolutional codec symbol
     *
     * @private
     * @type {string}
     * @memberof Convolutional
     */
    private _sym;
    /**
     * Creates an instance of Convolutional.
     * @param {(number[][] | string)} gen Output function or symbol
     * @memberof Convolutional
     */
    constructor(gen: number[][] | string);
    /**
     * Generates a symbol from the codec output function.
     *
     * @private
     * @returns {string} Symbol
     * @memberof Convolutional
     */
    private _makeSym;
    /**
     * Generates an output function from the codec symbol.
     *
     * @private
     * @returns {number[][]} Output function
     * @memberof Convolutional
     */
    private _makeOutFn;
    /**
     * Returns a single array whose elements correspond to the value of the
     * response of each output to the input as defined by the codec's
     * output function.
     *
     * @param {number} ip Input
     * @returns {number[]} Output array
     * @memberof Convolutional
     */
    encodeOne(ip: number): number[];
    /**
     * Returns an array whose elements correspond to an array of respective
     * responses of each output to the given inputs as defined by the codec's
     * output function.
     *
     * @param {number[]} inp Input bits
     * @returns {number[][]} Array of encoded outputs
     * @memberof Convolutional
     */
    encodeAll(inp: number[]): number[][];
    /**
     * Returns the array of inputs that would produce the given array of
     * outputs through the codec's output function. Decoding is implemented
     * using the Viterbi decoding algorithm.
     *
     * @param {number[][]} opStream Outputs
     * @returns {number[]} Inputs
     * @memberof Convolutional
     */
    decode(opStream: number[][]): number[];
    /**
     * Returns the corrected array of outputs. The given array is first
     * decoded using the Viterbi algorithm, and then re-encoded to produce
     * the correct encoded values.
     *
     * @param {number[][]} ops Received outputs
     * @returns {number[][]} Corrected outputs
     * @memberof Convolutional
     */
    correct(ops: number[][]): number[][];
    /**
     * Returns the current state of the codec.
     *
     * @type {number[]}
     * @memberof Convolutional
     */
    /**
    * Sets the state of the codec to the given array
    *
    * @memberof Convolutional
    */
    state: number[];
    /**
     * Returns the output function of the convolutional codec
     *
     * @readonly
     * @type {number[][]}
     * @memberof Convolutional
     */
    readonly outputFunc: number[][];
    /**
     * Returns the output function symbol of the convolutional codec
     *
     * @readonly
     * @type {string}
     * @memberof Convolutional
     */
    readonly symbol: string;
    /**
     * Returns the array of weights between arr and each array in
     * diffs. A weight is defined as the sum of element-wise bit
     * differences between two arrays.
     *
     * @static
     * @param {number[]} arr Input array
     * @param {number[][]} diffs Array of alternative paths
     * @returns {number[]} Weights
     * @memberof Convolutional
     */
    static computeWeights(arr: number[], diffs: number[][]): number[];
    /**
     * Converts a number in base 10 to base 2
     *
     * @static
     * @param {number} n
     * @returns {number}
     * @memberof Convolutional
     */
    static decToBin(n: number): number;
    /**
     * Pads a given string with another string to the left to the
     * given width
     *
     * @static
     * @param {string} s String to be padded
     * @param {number} n Width of the padded result
     * @param {string} w String with which to pad
     * @returns {string} Padded result
     * @memberof Convolutional
     */
    static padLeft(s: string, n: number, w: string): string;
}
