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
            throw new Error('Baseband and carrier must have the same length');
        }
        this._baseband = baseband;
        this._carrier = carrier;
        // Shift phase
        for (var i = 0; i < baseband.length; i++) {
            this._baseband[i] = this._baseband[i] === 1 ? 1 : -1;
        }
        this._modulated = this.multArrays(this._baseband, this._carrier);
        this._demodulated = this.multArrays(this._modulated, this._carrier);
    }
    /**
     * Returns an array whose individual elements are the products
     * of the individual elements of the received arrays
     *
     * @param {number[]} a
     * @param {number[]} b
     * @returns {number[]}
     * @memberof BPSK
     */
    BPSK.prototype.multArrays = function (a, b) {
        if (a.length !== b.length) {
            throw new Error('Arrays must have the same length');
        }
        var c = new Array(a.length + 1)
            .join('0')
            .split('')
            .map(parseFloat);
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
            throw new Error('Invalid array length');
        }
        return this.multArrays(rec, this._carrier);
    };
    return BPSK;
}());
exports.BPSK = BPSK;
