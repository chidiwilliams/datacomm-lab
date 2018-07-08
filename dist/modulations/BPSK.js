"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 *
 * @export
 * @class BPSK
 */
var BPSK = /** @class */ (function () {
    /**
     * Creates an instance of BPSK.
     * @param {number[]} baseband
     * @param {number[]} carrier
     * @memberof BPSK
     */
    function BPSK(baseband, carrier) {
        if (baseband.length !== carrier.length) {
            throw new Error('Baseband and carrier must have the same length.');
        }
        // Ensure baseband only contains binary values
        for (var i = 0; i < baseband.length; i++) {
            if (baseband[i] !== 0 && baseband[i] !== 1) {
                throw new Error('Baseband signal must contain only binary values.');
            }
        }
        // Shift baseband phase
        this._baseband = baseband;
        this._basebandPShifted = baseband.map(function (x) { return (x === 1 ? 1 : -1); });
        this._carrier = carrier;
        this._modulated = this._multArrays(this._basebandPShifted, this._carrier);
        this._demodulated = this._multArrays(this._modulated, this._carrier);
    }
    /**
     * Returns an array whose individual elements are the products
     * of the individual elements of the received arrays
     *
     * @private
     * @param {number[]} a
     * @param {number[]} b
     * @returns {number[]}
     * @memberof BPSK
     */
    BPSK.prototype._multArrays = function (a, b) {
        var c = new Array(a.length);
        for (var i = 0; i < a.length; i++) {
            c[i] = a[i] * b[i];
        }
        return c;
    };
    Object.defineProperty(BPSK.prototype, "modulated", {
        /**
         * Get modulated signal array
         *
         * @readonly
         * @type {number[]}
         * @memberof BPSK
         */
        get: function () {
            return this._modulated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BPSK.prototype, "demodulated", {
        /**
         * Get demodulated signal array
         *
         * @readonly
         * @type {number[]}
         * @memberof BPSK
         */
        get: function () {
            return this._demodulated;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the demodulated signal using a received signal array and
     * the previous carrier signal
     *
     * @param {number[]} rec
     * @returns {number[]}
     * @memberof BPSK
     */
    BPSK.prototype.demodulate = function (rec) {
        if (rec.length != this._demodulated.length) {
            throw new Error('Received signal and carrier must have the same length.');
        }
        return this._multArrays(rec, this._carrier);
    };
    return BPSK;
}());
exports.BPSK = BPSK;
