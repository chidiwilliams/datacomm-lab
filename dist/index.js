"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal = /** @class */ (function () {
    // private String name = "Signal";
    function Signal(samples) {
        this.name = 'Signal';
        this._signal = samples;
    }
    Object.defineProperty(Signal.prototype, "signal", {
        get: function () {
        },
        enumerable: true,
        configurable: true
    });
    return Signal;
}());
exports.Signal = Signal;
