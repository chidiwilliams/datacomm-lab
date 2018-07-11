"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = /** @class */ (function () {
    function Filter(filt_t, num_taps, Fs, Fx) {
        // Set these values to zero for lpf/hpf filters
        this._m_Fu = 0;
        this._m_phi = 0;
        this._m_filt_t = filt_t;
        this._m_Fs = Fs;
        this._m_num_taps = num_taps;
        this._m_taps = new Array(this._m_num_taps);
        this._m_sr = new Array(this._m_num_taps);
        if (Fs <= 0) {
            throw new Error('Fs must be greater than zero.');
        }
        if (num_taps <= 0 || num_taps > Filter.MAX_NUM_FILTER_TAPS) {
            throw new Error('num_taps must be greater than zero and less than Filter.MAX_NUM_FILTER_TAPS.');
        }
        if (filt_t === FilterType.LPF || filt_t === FilterType.HPF) {
            if (typeof Fx !== 'number') {
                throw new Error('Fx must be a number for FilterType.LPF and FilterType.HPF.');
            }
            if (Fx <= 0 || Fx >= Fs / 2) {
                throw new Error('Fx must be greater than zero and less than Fs / 2.');
            }
            this._m_Fx = Fx;
            this._m_lambda = (Math.PI * Fx) / (Fs / 2);
        }
        else {
            if (typeof Fx !== 'object' ||
                typeof Fx.Fl === 'undefined' ||
                typeof Fx.Fu === 'undefined') {
                throw new Error('Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.');
            }
            if (!(Fx.Fu > Fx.Fl)) {
                throw new Error('Fx.Fu must be greater than Fx.Fl.');
            }
            if (Fx.Fl <= 0 || Fx.Fl >= Fs / 2) {
                throw new Error('Fx.Fl must be greater than zero and less than Fs / 2.');
            }
            if (Fx.Fu <= 0 || Fx.Fu >= Fs / 2) {
                throw new Error('Fx.Fu must be greater than zero and less than Fs / 2.');
            }
            this._m_Fx = Fx.Fl;
            this._m_Fu = Fx.Fu;
            this._m_lambda = (Math.PI * Fx.Fl) / (Fs / 2);
            this._m_phi = (Math.PI * Fx.Fu) / (Fs / 2);
        }
        // Initialize shift registers
        for (var i = 0; i < this._m_num_taps; i++) {
            this._m_sr[i] = 0;
        }
        // Design filter
        if (filt_t === FilterType.LPF) {
            this.designLPF();
        }
        else if (filt_t === FilterType.HPF) {
            this.designHPF();
        }
        else {
            this.designBPF();
        }
    }
    Filter.prototype.designLPF = function () {
        for (var n = 0; n < this._m_num_taps; n++) {
            var mm = Math.floor(n - (this._m_num_taps - 1) / 2);
            if (mm === 0) {
                this._m_taps[n] = this._m_lambda / Math.PI;
            }
            else {
                this._m_taps[n] = Math.sin(mm * this._m_lambda) / (mm * Math.PI);
            }
        }
    };
    Filter.prototype.designHPF = function () {
        for (var n = 0; n < this._m_num_taps; n++) {
            var mm = Math.floor(n - (this._m_num_taps - 1) / 2);
            if (mm === 0) {
                this._m_taps[n] = 1 - this._m_lambda / Math.PI;
            }
            else {
                this._m_taps[n] = (-1 * Math.sin(mm * this._m_lambda)) / (mm * Math.PI);
            }
        }
    };
    Filter.prototype.designBPF = function () {
        for (var n = 0; n < this._m_num_taps; n++) {
            var mm = Math.floor(n - (this._m_num_taps - 1) / 2);
            if (mm === 0) {
                this._m_taps[n] = (this._m_phi - this._m_lambda) / Math.PI;
            }
            else {
                this._m_taps[n] =
                    (Math.sin(mm * this._m_phi) - Math.sin(mm * this._m_lambda)) /
                        (mm * Math.PI);
            }
        }
    };
    Filter.prototype.do_sample = function (data_sample) {
        // Shift register values
        for (var i = this._m_num_taps - 1; i >= 1; i--) {
            this._m_sr[i] = this._m_sr[i - 1];
        }
        // Set first register value to sample number
        this._m_sr[0] = data_sample;
        var result = 0;
        for (var i = 0; i < this._m_num_taps; i++) {
            result += this._m_sr[i] * this._m_taps[i];
        }
        return result;
    };
    Object.defineProperty(Filter.prototype, "taps", {
        get: function () {
            return this._m_taps;
        },
        enumerable: true,
        configurable: true
    });
    Filter.MAX_NUM_FILTER_TAPS = 1000;
    return Filter;
}());
exports.Filter = Filter;
var FilterType;
(function (FilterType) {
    FilterType[FilterType["BPF"] = 0] = "BPF";
    FilterType[FilterType["LPF"] = 1] = "LPF";
    FilterType[FilterType["HPF"] = 2] = "HPF";
})(FilterType = exports.FilterType || (exports.FilterType = {}));