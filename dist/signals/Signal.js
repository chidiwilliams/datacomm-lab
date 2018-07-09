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
        this._signal = new Array(Fs + 1)
            .join('0')
            .split('')
            .map(parseFloat);
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
                throw new Error('Invalid signal length');
            }
            this._signal = signal;
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
    /**
     * Samples the signal at the given frequency. For accuracy,
     * the sampling frequency must be a factor of the original
     * signal sampling frequency.
     *
     * @param {number} Fs Sampling frequency
     * @returns {number[]} Sampled signal array
     * @memberof Signal
     */
    Signal.prototype.sample = function (Fs) {
        if (Fs % this._signal.length !== 0) {
            throw new Error('New sampling frequency must be a multiple of the previous sampling frequency');
        }
        var r = new Array(Fs);
        var fact = Fs / this._signal.length;
        for (var i = 0; i < r.length; i++) {
            r[i] = this._signal[Math.floor(i / fact)];
        }
        return r;
    };
    /**
     * Returns the threshold values per numThresh divisions of the array
     *
     * @param {number} numThresh
     * @returns {number[]}
     * @memberof Signal
     */
    Signal.prototype.getThresholds = function (numThresh) {
        if (numThresh > this.signal.length) {
            throw new Error('Number of thresholds must be less than number of samples');
        }
        var thresholds = new Array(numThresh);
        var points = new Array(numThresh);
        // Get threshold points
        var beginning = Math.ceil(Math.floor(this.signal.length / numThresh / 2) - 1);
        var width = Math.ceil(Math.floor(this.signal.length / numThresh));
        for (var i = 0; i < numThresh; i++) {
            points[i] = width * i + beginning;
        }
        // Get thresholds
        for (var i = 0; i < numThresh; i++) {
            var point = points[i];
            thresholds[i] = this.signal[point] > 0 ? 1 : 0;
        }
        return thresholds;
    };
    /**
     * Returns the frequency magnitude response of the signal
     *
     * @returns Frequency magnitude response array
     * @memberof Signal
     */
    Signal.prototype.getFrequencyResponse = function () {
        if (isNaN(this._signal[0])) {
            throw new Error('Please add a signal array first');
        }
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
