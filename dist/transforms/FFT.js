"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var math = __importStar(require("mathjs"));
/**
 *
 *
 * @export
 * @class FFT
 */
var FFT = /** @class */ (function () {
    function FFT() {
    }
    /**
     * Computes the Fast Fourier Transform of a signal
     * using Radix-2 Cooley-Tukey algorithm
     *
     * @param {math.Complex[]} x Signal in time-domain
     * @returns {math.Complex[]} Signal in frequency-domain
     * @memberof FFT
     */
    FFT.prototype.fft = function (x) {
        // Base case
        if (x.length === 1) {
            return [x[0]];
        }
        if (x.length % 2 !== 0) {
            throw new Error('Length of input array must be a multiple of 2.');
        }
        // FFT of even terms
        var even = new Array(x.length / 2);
        for (var i = 0; i < x.length / 2; i++) {
            even[i] = x[2 * i];
        }
        var p = this.fft(even);
        // FFT of odd terms
        // Reuse array
        var odd = even;
        for (var i = 0; i < x.length / 2; i++) {
            odd[i] = x[2 * i + 1];
        }
        var q = this.fft(odd);
        // Combine
        var y = new Array(x.length);
        for (var i = 0; i < x.length / 2; i++) {
            var kth = (-2 * i * Math.PI) / x.length;
            var wk = math.complex(Math.cos(kth), Math.sin(kth));
            y[i] = math.complex(math.add(p[i], math.multiply(wk, q[i])).toString());
            y[i + x.length / 2] = math.complex(math.subtract(p[i], math.multiply(wk, q[i])).toString());
        }
        return y;
    };
    /**
     * Computes the Inverse Fast Fourier Transform of a signal
     *
     * @param {math.Complex[]} x Signal in frequency-domain
     * @returns {math.Complex[]} Signal in time-domain
     * @memberof FFT
     */
    FFT.prototype.ifft = function (x) {
        if (x.length % 2 !== 0) {
            throw new Error('Length of input array must be a multiple of 2.');
        }
        // Take conjugate
        var y = x.map(function (i) { return math.complex(math.conj(i).toString()); });
        // Compute forward FFT
        y = this.fft(y);
        // Take conjugate again
        y = y.map(function (i) { return math.complex(math.conj(i).toString()); });
        // Divide by array length
        y = y.map(function (i) { return math.complex(math.divide(i, x.length).toString()); });
        return y;
    };
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
    FFT.prototype.cconvolve = function (x, y) {
        if (x.length !== y.length) {
            throw new Error('Arrays must have equal lengths.');
        }
        if (x.length % 2 !== 0 || y.length % 2 !== 0) {
            throw new Error('Length of input arrays must be a multiple of 2.');
        }
        // Compute FFT of each sequence
        var a = this.fft(x);
        var b = this.fft(y);
        // Point-wise multiplication
        var c = new Array(x.length);
        for (var i = 0; i < x.length; i++) {
            c[i] = math.complex(math.multiply(a[i], b[i]).toString());
        }
        // Compute inverse FFT
        return this.ifft(c);
    };
    /**
     * Returns the convolution of two signals
     *
     * @param {math.Complex[]} x Signal 1
     * @param {math.Complex[]} y Signal 2
     * @returns {math.Complex[]} Convolution result
     * @memberof FFT
     */
    FFT.prototype.convolve = function (x, y) {
        if (x.length !== y.length) {
            throw new Error('Arrays must have equal lengths.');
        }
        if (x.length % 2 !== 0 || y.length % 2 !== 0) {
            throw new Error('Length of input arrays must be a multiple of 2.');
        }
        var ZERO = math.complex(0, 0);
        var a = new Array(2 * x.length);
        a = x.slice(0);
        for (var i = x.length; i < 2 * x.length; i++) {
            a[i] = ZERO;
        }
        var b = new Array(2 * y.length);
        b = y.slice(0);
        for (var i = y.length; i < 2 * y.length; i++) {
            b[i] = ZERO;
        }
        return this.cconvolve(a, b);
    };
    return FFT;
}());
exports.FFT = FFT;
