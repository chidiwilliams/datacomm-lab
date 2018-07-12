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
        return Array.apply(null, Array(numSamples)).map(function () {
            return Math.sqrt(-2.0 * Math.log(Math.random())) *
                Math.cos(2.0 * Math.PI * Math.random());
        });
    };
    return AWGN;
}());
exports.AWGN = AWGN;
