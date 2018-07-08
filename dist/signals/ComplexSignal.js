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
 * @class ComplexSignal
 * @extends {Signal}
 */
var ComplexSignal = /** @class */ (function (_super) {
    __extends(ComplexSignal, _super);
    /**
     *Creates an instance of ComplexSignal.
     * @param {number} samples
     * @param {math.Complex[]} signal
     * @memberof ComplexSignal
     */
    function ComplexSignal(samples, signal) {
        var _this = _super.call(this, samples) || this;
        _this._jSignal = signal;
        return _this;
    }
    Object.defineProperty(ComplexSignal.prototype, "jSignal", {
        /**
         * Returns the complex signal array.
         *
         * @type {math.Complex[]}
         * @memberof ComplexSignal
         */
        get: function () {
            return this._jSignal;
        },
        /**
         * Sets the complex signal array
         *
         * @memberof ComplexSignal
         */
        set: function (v) {
            this._jSignal = v;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the complex signal value at the index-th sample.
     *
     * @param {number} index
     * @returns {math.Complex} Complex signal array
     * @memberof ComplexSignal
     */
    ComplexSignal.prototype.getJSignalValue = function (index) {
        return this._jSignal[index];
    };
    /**
     * Returns an array corresponding to the magnitudes of each value in the complex signal.
     *
     * @returns {number[]} Magnitude array
     * @memberof ComplexSignal
     */
    ComplexSignal.prototype.magnitude = function () {
        var m = new Array(this._jSignal.length);
        for (var i = 0; i < this._jSignal.length; i++) {
            m[i] = this._jSignal[i].toPolar().r;
        }
        return m;
    };
    return ComplexSignal;
}(Signal_1.Signal));
exports.ComplexSignal = ComplexSignal;
