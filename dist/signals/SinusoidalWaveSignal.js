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
var SineWaveSignal = /** @class */ (function (_super) {
    __extends(SineWaveSignal, _super);
    function SineWaveSignal(Fs, Fa, phi) {
        var _this = _super.call(this, Fs) || this;
        _this._Fa = Fa;
        _this._phi = phi;
        var carr = _this.signal.map(function (x, i) {
            return Math.sin((2 * Math.PI * _this._Fa * i) / _this.signal.length + _this._phi);
        });
        _this.signal = carr;
        return _this;
    }
    return SineWaveSignal;
}(Signal_1.Signal));
exports.SineWaveSignal = SineWaveSignal;
