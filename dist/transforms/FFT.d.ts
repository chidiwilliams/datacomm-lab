import * as math from 'mathjs';
/**
 *
 *
 * @export
 * @class FFT
 */
export declare class FFT {
    /**
     * Computes the Fast Fourier Transform of a signal
     * using Radix-2 Cooley-Tukey algorithm
     *
     * @param {math.Complex[]} x Signal in time-domain
     * @returns {math.Complex[]} Signal in frequency-domain
     * @memberof FFT
     */
    fft(x: math.Complex[]): math.Complex[];
    /**
     * Computes the Inverse Fast Fourier Transform of a signal
     *
     * @param {math.Complex[]} x Signal in frequency-domain
     * @returns {math.Complex[]} Signal in time-domain
     * @memberof FFT
     */
    ifft(x: math.Complex[]): math.Complex[];
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
    cconvolve(x: math.Complex[], y: math.Complex[]): math.Complex[];
    /**
     * Returns the convolution of two signals
     *
     * @param {math.Complex[]} x Signal 1
     * @param {math.Complex[]} y Signal 2
     * @returns {math.Complex[]} Convolution result
     * @memberof FFT
     */
    convolve(x: math.Complex[], y: math.Complex[]): math.Complex[];
}
