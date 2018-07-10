"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class AWGN
 */
var AWGN = /** @class */ (function () {
    function AWGN() {
    }
    /**
     * Get the noise array
     *
     * @static
     * @param {number} numSamples
     * @returns {number[]}
     * @memberof AWGN
     */
    AWGN.generate = function (numSamples) {
        var n = new Array(numSamples);
        for (var i = 0; i < n.length; i++) {
            n[i] = AWGN._next();
        }
        return n;
    };
    /**
     * Generates new Gaussian random number
     *
     * @private
     * @static
     * @returns {number}
     * @memberof AWGN
     */
    AWGN._next = function () {
        var u = 0;
        var v = 0;
        while (u === 0)
            u = Math.random();
        while (v === 0)
            v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };
    return AWGN;
}());
exports.AWGN = AWGN;
