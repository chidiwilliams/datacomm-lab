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
var WaveSignal = /** @class */ (function (_super) {
    __extends(WaveSignal, _super);
    function WaveSignal(type, Fs, Fa, phi) {
        var _this = this;
        if (Fa > Fs / 2) {
            throw new Error('Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)');
        }
        _this = _super.call(this, Fs) || this;
        _this._Fa = Fa;
        _this._phi = phi || 0;
        var carr = _this.signal.slice(0);
        if (type === WaveSignalType.SINE) {
            carr = carr.map(function (x, i) {
                return Math.sin((2 * Math.PI * _this._Fa * i) / Fs + _this._phi);
            });
        }
        else if (type === WaveSignalType.SQUARE) {
            for (var i = 0; i < Fa; i++) {
                for (var j = Math.ceil((Fs * i) / Fa); j < (Fs * i) / Fa + Fs / (Fa * 2); j++) {
                    carr[j] = 1;
                }
            }
        }
        _this.signal = carr;
        return _this;
    }
    return WaveSignal;
}(Signal_1.Signal));
exports.WaveSignal = WaveSignal;
var WaveSignalType;
(function (WaveSignalType) {
    WaveSignalType[WaveSignalType["SINE"] = 0] = "SINE";
    WaveSignalType[WaveSignalType["SQUARE"] = 1] = "SQUARE";
    WaveSignalType[WaveSignalType["TRIANGULAR"] = 2] = "TRIANGULAR";
})(WaveSignalType = exports.WaveSignalType || (exports.WaveSignalType = {}));
