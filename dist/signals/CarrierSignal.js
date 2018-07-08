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
 * @class CarrierSignal
 * @extends {Signal}
 */
var CarrierSignal = /** @class */ (function (_super) {
    __extends(CarrierSignal, _super);
    /**
     * Creates an instance of CarrierSignal.
     * @param {number} Fs Sampling frequency
     * @param {number} Fa Signal frequency
     * @memberof CarrierSignal
     */
    function CarrierSignal(Fs, Fa) {
        var _this = this;
        if (Fa >= Fs / 2) {
            throw new Error('Carrier frequency must be less than half the sampling frequency (Fa < Fs / 2)');
        }
        _this = _super.call(this, Fs) || this;
        // Generate carrier with 2 * PI * frequency * ith-sample
        _this._freq = Fa;
        var carrier = new Array(Fs);
        for (var i = 0; i < Fs; i++) {
            carrier[i] = Math.sin((2 * Math.PI * Fa * i) / Fs);
        }
        _this.signal = carrier;
        return _this;
    }
    Object.defineProperty(CarrierSignal.prototype, "freq", {
        /**
         * Get the signal frequency
         *
         * @type {number}
         * @memberof CarrierSignal
         */
        get: function () {
            return this._freq;
        },
        enumerable: true,
        configurable: true
    });
    return CarrierSignal;
}(Signal_1.Signal));
exports.CarrierSignal = CarrierSignal;
