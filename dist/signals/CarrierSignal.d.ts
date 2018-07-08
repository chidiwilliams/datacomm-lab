import { Signal } from './Signal';
/**
 *
 *
 * @export
 * @class CarrierSignal
 * @extends {Signal}
 */
export declare class CarrierSignal extends Signal {
    private _freq;
    /**
     * Creates an instance of CarrierSignal.
     * @param {number} Fs Sampling frequency
     * @param {number} Fa Signal frequency
     * @memberof CarrierSignal
     */
    constructor(Fs: number, Fa: number);
    /**
     * Get the signal frequency
     *
     * @type {number}
     * @memberof CarrierSignal
     */
    readonly freq: number;
}
