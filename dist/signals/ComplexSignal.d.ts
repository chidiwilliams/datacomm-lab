import * as math from 'mathjs';
import { Signal } from './Signal';
/**
 *
 *
 * @export
 * @class ComplexSignal
 * @extends {Signal}
 */
export declare class ComplexSignal extends Signal {
    private _jSignal;
    /**
     *Creates an instance of ComplexSignal.
     * @param {number} samples
     * @param {math.Complex[]} signal
     * @memberof ComplexSignal
     */
    constructor(samples: number, signal: math.Complex[]);
    /**
     * Returns the complex signal array.
     *
     * @type {math.Complex[]}
     * @memberof ComplexSignal
     */
    /**
    * Sets the complex signal array
    *
    * @memberof ComplexSignal
    */
    jSignal: math.Complex[];
    /**
     * Gets the complex signal value at the index-th sample.
     *
     * @param {number} index
     * @returns {math.Complex} Complex signal array
     * @memberof ComplexSignal
     */
    getJSignalValue(index: number): math.Complex;
    /**
     * Returns an array corresponding to the magnitudes of each value in the complex signal.
     *
     * @returns {number[]} Magnitude array
     * @memberof ComplexSignal
     */
    magnitude(): number[];
}
