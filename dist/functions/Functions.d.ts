import * as math from 'mathjs';
/**
 *
 *
 * @export
 * @class FFT
 */
export declare class Functions {
    /**
     * Computes the Fast Fourier Transform of a signal
     * using Radix-2 Cooley-Tukey algorithm
     *
     * @param {math.Complex[]} x Signal in time-domain
     * @returns {math.Complex[]} Signal in frequency-domain
     * @memberof FFT
     */
    static fft(x: math.Complex[]): math.Complex[];
    /**
     * Computes the Inverse Fast Fourier Transform of a signal
     *
     * @param {math.Complex[]} x Signal in frequency-domain
     * @returns {math.Complex[]} Signal in time-domain
     * @memberof FFT
     */
    static ifft(x: math.Complex[]): math.Complex[];
    /**
     * Returns the circular, or cyclic, convolution of two signals,
     * representing the IFFT of the point-wise product of the FFTs of the
     * individual signals.
     *
     * @param {math.Complex[]} x Signal 1
     * @param {math.Complex[]} y Signal 2
     * @returns {math.Complex[]} Circular convolution result
     * @memberof FFT
     */
    static cconvolve(x: math.Complex[], y: math.Complex[]): math.Complex[];
    /**
     * Returns the convolution of two signals
     *
     * @param {math.Complex[]} x Signal 1
     * @param {math.Complex[]} y Signal 2
     * @returns {math.Complex[]} Convolution result
     * @memberof FFT
     */
    static convolve(x: math.Complex[], y: math.Complex[]): math.Complex[];
    /**
     * Returns true if n is a power of 2. Else, returns false.
     *
     * @static
     * @param {number} n Number
     * @returns {boolean} Result
     * @memberof Functions
     */
    static isRadix2(n: number): boolean;
    /**
     * Returns the element-wise addition of the arrays
     *
     * @static
     * @param {number[][]} x Array of arrays containting numbers
     * @returns {number[]} Array of addition
     * @memberof Functions
     */
    static add(x: number[][]): number[];
}
