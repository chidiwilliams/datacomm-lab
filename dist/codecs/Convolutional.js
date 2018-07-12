"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convolutional encoder and decoder
 *
 * @export
 * @class Convolutional
 */
var Convolutional = /** @class */ (function () {
    /**
     * Creates an instance of Convolutional.
     * @param {(number[][] | string)} gen Output function or symbol
     * @memberof Convolutional
     */
    function Convolutional(gen) {
        if (typeof gen === 'object') {
            gen.forEach(function (x) {
                x.forEach(function (bit) {
                    if (bit !== 0 && bit !== 1) {
                        throw new Error('Only binary inputs allowed.');
                    }
                });
            });
            this._state = Array.apply(null, Array(gen[0].length)).map(function () { return 0; });
            this._outFn = gen;
            this._sym = this._makeSym();
        }
        else {
            this._sym = gen;
            this._outFn = this._makeOutFn();
            this._state = Array.apply(null, Array(this._outFn[0].length)).map(function () { return 0; });
        }
    }
    /**
     * Generates a symbol from the codec output function.
     *
     * @private
     * @returns {string} Symbol
     * @memberof Convolutional
     */
    Convolutional.prototype._makeSym = function () {
        // A symbol is defined as: "x.a.b.c.d.e....", where x is the
        // number of shift registers in the convolutional codec, and
        // a, b, c,... are output function number. Each output function
        // number is the decimal equivalent of the binary representation
        // of the function between the output and the shift registers.
        // Thus, a convolutional codec with 3 outputs and 4 shift
        // registers where:
        //  O1 = SR1 xor SR2 xor SR3
        //  O2 = SR2 xor SR3 xor SR4
        //  O3 = SR1 xor SR3 xor SR4
        // Will be represented as:
        //  O1 = 1 * 2^3 + 1 * 2^2 + 1 * 2^1 + 0 * 2^0
        //     = 8 + 4 + 2 + 0 = 14
        //  O2 = 0 * 2^3 + 1 * 2^2 + 1 * 2^1 + 1 * 2^0
        //     = 0 + 4 + 2 + 1 = 7
        //  O3 = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0
        //     = 8 + 0 + 2 + 1 = 11
        // Therefore, the symbol will be: 4.14.7.11
        // Object containing each section of the symbol
        var syms = [];
        // Add the number of shift registers (length of the state)
        syms.push(this._state.length);
        // For each output function in the outputs...
        this._outFn.forEach(function (x, i) {
            // V is the output function number
            var v = 0;
            // For each output-register relationship
            x.forEach(function (y, j) {
                // If rel === 1...
                if (y) {
                    // Add 2^position to the output number
                    v += Math.pow(2, x.length - 1 - j);
                }
            });
            // Push the final output function number
            syms.push(v);
        });
        return syms.join('.');
    };
    /**
     * Generates an output function from the codec symbol.
     *
     * @private
     * @returns {number[][]} Output function
     * @memberof Convolutional
     */
    Convolutional.prototype._makeOutFn = function () {
        // Split the symbol string
        var syms = this._sym.split('.');
        // The first number is the number of shift registers, or
        // the width of the codec
        var w = parseInt(syms[0]);
        // The rest of the symbol string is the output function
        var ops = syms.slice(1).map(parseFloat);
        // Return an array with each element representing each output
        return Array.apply(null, Array(ops.length)).map(function (x, i) {
            // For each output...
            // Convert each output's "function" number to a string of its
            // binary equivalent
            var bit = Convolutional.decToBin(ops[i]).toString();
            // Pad the binary string to the number of registers
            // (codec width) padding 0s to the left
            // Next, map each string's value to the respective register
            return Convolutional.padLeft(bit, w, '0')
                .split('')
                .map(parseFloat);
        });
    };
    /**
     * Returns a single array whose elements correspond to the value of the
     * response of each output to the input as defined by the codec's
     * output function.
     *
     * @param {number} ip Input
     * @returns {number[]} Output array
     * @memberof Convolutional
     */
    Convolutional.prototype.encodeOne = function (ip) {
        for (var i = this._state.length; i >= 2; i--) {
            this._state[i - 1] = this._state[i - 2];
        }
        this._state[0] = ip;
        var ops = Array.apply(null, Array(this._outFn.length)).map(function () { return 0; });
        for (var i = 0; i < this._outFn.length; i++) {
            for (var j = 0; j < this._outFn[0].length; j++) {
                ops[i] = (ops[i] + this._outFn[i][j] * this._state[j]) % 2;
            }
        }
        return ops;
    };
    /**
     * Returns an array whose elements correspond to an array of respective
     * responses of each output to the given inputs as defined by the codec's
     * output function.
     *
     * @param {number[]} inp Input bits
     * @returns {number[][]} Array of encoded outputs
     * @memberof Convolutional
     */
    Convolutional.prototype.encodeAll = function (inp) {
        var _this = this;
        return Array.apply(null, Array(inp.length)).map(function (x, i) {
            return _this.encodeOne(inp[i]);
        });
    };
    /**
     * Returns the array of inputs that would produce the given array of
     * outputs through the codec's output function. Decoding is implemented
     * using the Viterbi decoding algorithm.
     *
     * @param {number[][]} opStream Outputs
     * @returns {number[]} Inputs
     * @memberof Convolutional
     */
    Convolutional.prototype.decode = function (opStream) {
        var _this = this;
        opStream.forEach(function (op) {
            if (op.length !== _this._outFn.length) {
                throw new Error('Invalid number of outputs.');
            }
            op.forEach(function (bit) {
                if (bit !== 0 && bit !== 1) {
                    throw new Error('Only binary inputs allowed.');
                }
            });
        });
        var combs = Array.apply(null, Array(Math.pow(2, opStream.length))).map(function () { return Array.apply(null, Array(opStream.length)).map(function () { return 0; }); });
        var ws = Array.apply(null, Array(Math.pow(2, opStream.length))).map(function () { return 0; });
        // Save current state
        var stt = this._state.slice(0);
        // Get all possible combinations of binary inputs
        combs = combs.map(function (x, i) {
            var bits = Convolutional.decToBin(i);
            var x_bits = Convolutional.padLeft(bits.toString(), opStream.length, '0');
            return x_bits.split('').map(parseFloat);
        });
        combs.forEach(function (comb, i) {
            var ops = _this.encodeAll(comb);
            ops.forEach(function (op, j) {
                ws[i] += Convolutional.computeWeights(op, [opStream[j]])[0];
            });
            _this._state = stt.slice(0);
        });
        var minW = ws[0];
        var minP = 0;
        ws.forEach(function (w, i) {
            if (w < minW) {
                minW = w;
                minP = i;
            }
        });
        var bit = Convolutional.decToBin(minP);
        var x_bit = Convolutional.padLeft(bit.toString(), opStream.length, '0');
        var rcv = Array.apply(null, Array(x_bit.length)).map(function (x, i) { return parseFloat(x_bit[i]); });
        return rcv;
    };
    /**
     * Returns the corrected array of outputs. The given array is first
     * decoded using the Viterbi algorithm, and then re-encoded to produce
     * the correct encoded values.
     *
     * @param {number[][]} ops Received outputs
     * @returns {number[][]} Corrected outputs
     * @memberof Convolutional
     */
    Convolutional.prototype.correct = function (ops) {
        // Find the decoded input for the received output
        var dec = this.decode(ops);
        // Backup the current state
        var prevState = this._state.slice(0);
        // Send the decoded input back to receive the correct encoded output
        var corr = this.encodeAll(dec);
        // Revert the state back to previous value
        this._state = prevState.slice(0);
        return corr;
    };
    Object.defineProperty(Convolutional.prototype, "state", {
        /**
         * Returns the current state of the codec.
         *
         * @type {number[]}
         * @memberof Convolutional
         */
        get: function () {
            return this._state;
        },
        /**
         * Sets the state of the codec to the given array
         *
         * @memberof Convolutional
         */
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Convolutional.prototype, "outputFunc", {
        /**
         * Returns the output function of the convolutional codec
         *
         * @readonly
         * @type {number[][]}
         * @memberof Convolutional
         */
        get: function () {
            return this._outFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Convolutional.prototype, "symbol", {
        /**
         * Returns the output function symbol of the convolutional codec
         *
         * @readonly
         * @type {string}
         * @memberof Convolutional
         */
        get: function () {
            return this._sym;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the array of weights between arr and each array in
     * diffs. A weight is defined as the sum of element-wise bit
     * differences between two arrays.
     *
     * @static
     * @param {number[]} arr Input array
     * @param {number[][]} diffs Array of alternative paths
     * @returns {number[]} Weights
     * @memberof Convolutional
     */
    Convolutional.computeWeights = function (arr, diffs) {
        diffs.forEach(function (chk) {
            if (chk.length !== arr.length) {
                throw new Error('Arrays must be of equal length.');
            }
        });
        return Array.apply(null, Array(diffs.length)).map(function (x, i) {
            var w = 0;
            for (var j = 0; j < diffs[i].length; j++) {
                if (arr[j] !== diffs[i][j])
                    w += 1;
            }
            return w;
        });
    };
    /**
     * Converts a number in base 10 to base 2
     *
     * @static
     * @param {number} n
     * @returns {number}
     * @memberof Convolutional
     */
    Convolutional.decToBin = function (n) {
        var bin = [];
        if (n === 0)
            return 0;
        while (n >= 1) {
            bin.push(n % 2);
            n = Math.floor(n / 2);
        }
        return parseInt(bin.reverse().join(''));
    };
    /**
     * Pads a given string with another string to the left to the
     * given width
     *
     * @static
     * @param {string} s String to be padded
     * @param {number} n Width of the padded result
     * @param {string} w String with which to pad
     * @returns {string} Padded result
     * @memberof Convolutional
     */
    Convolutional.padLeft = function (s, n, w) {
        if (s.length > n)
            throw new Error('Width must be larger than the string.');
        if (s.length === n)
            return s;
        return Convolutional.padLeft(w + s, n, w);
    };
    return Convolutional;
}());
exports.Convolutional = Convolutional;
