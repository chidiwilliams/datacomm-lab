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
var __1 = require("../");
/**
 *
 *
 * @export
 * @class Signal
 */
var Signal = /** @class */ (function () {
    /**
     * Creates an instance of Signal.
     * @param {number} Fs Sampling frequency
     * @memberof Signal
     */
    function Signal(Fs) {
        this._signal = new Array(Fs);
        for (var i = 0; i < Fs; i++) {
            this._signal[i] = 0;
        }
    }
    Object.defineProperty(Signal.prototype, "signal", {
        /**
         * Get the signal array
         *
         * @type {number[]}
         * @memberof Signal
         */
        get: function () {
            return this._signal;
        },
        /**
         * Set the signal array
         *
         * @memberof Signal
         */
        set: function (signal) {
            if (signal.length !== this._signal.length) {
                throw new Error('Invalid signal length.');
            }
            this._signal = signal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Signal.prototype, "Fs", {
        /**
         * Get the sampling frequency given as the length of the signal
         *
         * @readonly
         * @type {number}
         * @memberof Signal
         */
        get: function () {
            return this._signal.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the value of the signal at a sample value
     *
     * @param {number} index
     * @returns
     * @memberof Signal
     */
    Signal.prototype.getSignalValue = function (index) {
        return this._signal[index];
    };
    /**
     * Set the value of the signal at a sample value
     *
     * @param {number} index
     * @param {number} value
     * @memberof Signal
     */
    Signal.prototype.setSignalValue = function (index, value) {
        this._signal[index] = value;
    };
    Signal.prototype.sample = function (Fs) {
        if (Fs < this.Fs && this.Fs % Fs !== 0) {
            throw new Error('The new sampling frequency must be a factor of the current sampling frequency if it is lower than the current sampling frequency.');
        }
        if (Fs > this.Fs && Fs % this.Fs !== 0) {
            throw new Error('The new sampling frequency must be a multiple of the current sampling frequency if it is higher than the current sampling frequency.');
        }
        return Fs < this.Fs
            ? this._sampleLess(Fs)
            : this._sampleMore(Fs);
    };
    /**
     * Samples the signal at the given frequency higher than the
     * original frequency. For accuracy, the new sampling frequency must
     * be a multiple of the original signal sampling frequency.
     *
     * @private
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    Signal.prototype._sampleMore = function (Fs) {
        var r = new Array(Fs);
        var k = Fs / this.Fs;
        for (var i = 0; i < r.length; i++) {
            r[i] = this._signal[Math.floor(i / k)];
        }
        return r;
    };
    /**
     * Samples the signal at the given frequency lower than the
     * original frequency.
     *
     * @private
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    Signal.prototype._sampleLess = function (Fs) {
        // Get the number of samples in each division of the current array
        // to be represented by one sample in the new array
        var k = this.Fs / Fs;
        // Get the sample in the middle of the division, favoring the
        // earlier sample in the event of an even-length division
        return this._signal.filter(function (x, i) { return (i + Math.floor(k / 2) + 1) % k === 0; });
    };
    /**
     * Returns the frequency magnitude response of the signal
     *
     * @returns Frequency magnitude response array
     * @memberof Signal
     */
    Signal.prototype.getFrequencyResponse = function () {
        if (!__1.FFT.isRadix2(this._signal.length)) {
            throw new Error('Signal sampling frequency must be a power of 2.');
        }
        // Convert signal to complex array
        var comp = this._signal.map(function (x) { return math.complex(x, 0); });
        // Compute FFT
        var sigFFT = new __1.FFT().fft(comp);
        // Compute two-sided spectrum
        var twoSSpectrum = new Array(this.signal.length);
        for (var i = 0; i < twoSSpectrum.length; i++) {
            twoSSpectrum[i] =
                math.complex(sigFFT[i]).toPolar().r / twoSSpectrum.length;
        }
        // Compute single-sided spectrum
        var sinSSpectrum = twoSSpectrum
            .slice(0, twoSSpectrum.length / 2 + 1)
            .map(function (x, i, arr) { return (i === 0 || i === arr.length - 1 ? x : x * 2); });
        return sinSSpectrum;
    };
    return Signal;
}());
exports.Signal = Signal;
