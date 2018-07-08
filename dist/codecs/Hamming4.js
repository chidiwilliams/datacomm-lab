"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hamming4 = /** @class */ (function () {
    function Hamming4() {
    }
    Hamming4.prototype.encode = function (m, par) {
        if (m.length !== 4) {
            throw new Error('Input array must have a length of 4.');
        }
        // Ensure array contains only binary values
        for (var i = 0; i < m.length; i++) {
            if (m[i] != 0 && m[i] != 1) {
                throw new Error('Input array must contain only zeros and ones.');
            }
        }
        // Do Hamming
        var out = [0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                out[i] += Hamming4.GEN_MATRIX[i][j] * m[j];
            }
            out[i] = out[i] % 2;
        }
        // Compute parity bit
        var s = 0;
        for (var i = 0; i < out.length; i++) {
            s += out[i];
        }
        var p = s % 2 === 0 ? 0 : 1;
        return par ? out.concat(p) : out;
    };
    Hamming4.prototype.decode = function (rec) {
        if (rec.length !== 7) {
            throw new Error('Input array must have a length of 7.');
        }
        // Correct received matrix
        var cor = this.correct(rec);
        // Decode the bits to reclaim the original four-bit array
        var dec = [0, 0, 0, 0];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 7; j++) {
                dec[i] += Hamming4.DECODE_MATRIX[i][j] * cor[j];
            }
        }
        return dec;
    };
    Hamming4.prototype.correct = function (rec) {
        if (rec.length !== 7) {
            throw new Error('Input array must have a length of 7.');
        }
        // Get bit position at which error occured
        var errBit = this.getErrorBit(rec);
        // If bit position >= 0, switch bit at that position
        if (errBit >= 0) {
            rec[errBit] = rec[errBit] === 0 ? 1 : 0;
        }
        return rec;
    };
    Hamming4.prototype.getErrorBit = function (rec) {
        // Get the syndrome matrix
        var syn = this.getSyndrome(rec);
        var err = -1;
        for (var i = 0; i < syn.length; i++) {
            err += syn[i] * Math.pow(2, 2 - i);
        }
        return err;
    };
    Hamming4.prototype.getSyndrome = function (rec) {
        if (rec.length !== 7) {
            throw new Error('Array length must be 7.');
        }
        var syn = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 7; j++) {
                syn[2 - i] += Hamming4.CHECK_MATRIX[i][j] * rec[j];
            }
            syn[2 - i] = syn[2 - i] % 2;
        }
        return syn;
    };
    Hamming4.GEN_MATRIX = [
        [1, 1, 0, 1],
        [1, 0, 1, 1],
        [1, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
    Hamming4.CHECK_MATRIX = [
        [1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 0, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 1],
    ];
    Hamming4.DECODE_MATRIX = [
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 1],
    ];
    return Hamming4;
}());
exports.Hamming4 = Hamming4;
