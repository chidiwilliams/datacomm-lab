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
var Signal_1 = require("../Signal");
var SquareWaveSignal = /** @class */ (function (_super) {
    __extends(SquareWaveSignal, _super);
    function SquareWaveSignal(Fs, Fa, phi) {
        var _this = this;
        if (Fa >= Fs / 2) {
            throw new Error('Signal frequency must be less than half the sampling frequency (Fa < Fs / 2)');
        }
        _this = _super.call(this, Fs) || this;
        return _this;
    }
    return SquareWaveSignal;
}(Signal_1.Signal));
exports.SquareWaveSignal = SquareWaveSignal;
