"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = require("./Signal");
/**
 *
 *
 * @export
 * @class WaveSignal
 * @extends {Signal}
 */
var WaveSignal = /** @class */ (function (_super) {
    __extends(WaveSignal, _super);
    /**
     * Creates an instance of WaveSignal. Phi (phase angle) is optional for sine wave; if not given, phase angle of 0 is used.
     * @param {WaveSignalType} type Type of wave (Sine, square or triangular)
     * @param {number} Fs Sampling frequency
     * @param {number} Fa Signal frequency
     * @param {number} [phi] Phase angle
     * @memberof WaveSignal
     */
    function WaveSignal(type, Fs, Fa, phi) {
        var _this = this;
        if (Fa >= Fs / 2) {
            throw new Error('Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)');
        }
        _this = _super.call(this, Fs) || this;
        _this._Fa = Fa;
        _this._phi = phi || 0;
        _this.signal =
            type === WaveSignalType.SINE
                ? _this._generateSine()
                : type === WaveSignalType.SQUARE
                    ? _this._generateSquare()
                    : _this._generateTriangular();
        return _this;
    }
    /**
     * Generates a sine wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    WaveSignal.prototype._generateSine = function () {
        var carr = new Array(this.Fs);
        for (var i = 0; i < this.Fs; i++) {
            carr[i] = Math.sin((2 * Math.PI * this._Fa * i) / this.Fs + this._phi);
        }
        return carr;
    };
    /**
     * Generates a square wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    WaveSignal.prototype._generateSquare = function () {
        var carr = new Array(this.Fs);
        for (var i = 0; i < this._Fa; i++) {
            // Divide the samples by the number of repeating signal units (frequency, Fa)
            var k = this.Fs / this._Fa;
            // For each division, from start to half of the frequency limit, put 1s, while the other half samples remain zeros
            for (var j = Math.ceil(k * i); j < Math.ceil(k * (i + 0.5)); j++) {
                carr[j] = 1;
            }
        }
        return carr;
    };
    /**
     * Generates a triangular wave signal
     *
     * @private
     * @returns {number[]} Samples
     * @memberof WaveSignal
     */
    WaveSignal.prototype._generateTriangular = function () {
        var carr = new Array(this.Fs);
        // For each frequency division...
        for (var i = 0; i < this._Fa; i++) {
            var k = this.Fs / this._Fa;
            // Get the first sample of the division
            var sample1 = Math.ceil(k * i);
            // Get the range divisions of the frequency
            var range = Math.ceil(k);
            var halfRange = Math.ceil(0.5 * k);
            var quarterRange = Math.ceil(0.25 * k);
            // From start to one-quarter of the range, store each sample as a rising gradient from 0 to 1
            for (var j = sample1; j < sample1 + quarterRange; j++) {
                carr[j] = (j - sample1) / quarterRange;
            }
            // From one-quarter to half of the range, store each sample as a falling gradient from 1 to 0
            for (var j = sample1 + quarterRange; j < sample1 + halfRange; j++) {
                carr[j] = (-1 * (j - (sample1 + quarterRange))) / quarterRange + 1;
            }
            // From half to three-quarters of the range, store each sample as a falling gradient from 0 to -1
            for (var j = sample1 + halfRange; j < sample1 + halfRange + quarterRange; j++) {
                carr[j] = (-1 * (j - (sample1 + halfRange))) / quarterRange;
            }
            // From three-quarters to end of the range, store each sample as a rising gradient from -1 to 0
            for (var j = sample1 + halfRange + quarterRange; j < sample1 + range; j++) {
                carr[j] = (j - (sample1 + halfRange + quarterRange)) / quarterRange - 1;
            }
        }
        return carr;
    };
    return WaveSignal;
}(Signal_1.Signal));
exports.WaveSignal = WaveSignal;
var WaveSignalType;
(function (WaveSignalType) {
    WaveSignalType[WaveSignalType["SINE"] = 0] = "SINE";
    WaveSignalType[WaveSignalType["SQUARE"] = 1] = "SQUARE";
    WaveSignalType[WaveSignalType["TRIANGULAR"] = 2] = "TRIANGULAR";
})(WaveSignalType = exports.WaveSignalType || (exports.WaveSignalType = {}));
