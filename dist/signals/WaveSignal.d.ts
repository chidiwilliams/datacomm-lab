import { Signal } from './Signal';
/**
 *
 *
 * @export
 * @class WaveSignal
 * @extends {Signal}
 */
export declare class WaveSignal extends Signal {
    private _Fa;
    private _phi;
    /**
     * Creates an instance of WaveSignal. Phi (phase angle) is optional for sine wave; if not given, phase angle of 0 is used.
     * @param {WaveSignalType} type Type of wave (Sine, square or triangular)
     * @param {number} Fs Sampling frequency
     * @param {number} Fa Signal frequency
     * @param {number} [phi] Phase angle
     * @memberof WaveSignal
     */
    constructor(type: WaveSignalType, Fs: number, Fa: number, phi?: number);
    /**
     * Generates a triangular wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    private _generateTriangular;
    /**
     * Generates a square wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    private _generateSquare;
    /**
     * Generates a sine wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    private _generateSine;
}
export declare enum WaveSignalType {
    'SINE' = 0,
    'SQUARE' = 1,
    'TRIANGULAR' = 2
}
