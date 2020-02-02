import { expect } from 'chai';
import math from 'mathjs';
import { Functions } from '../functions/Functions';
import { Signal } from '../signals/Signal';
import { WaveSignal, WaveSignalType } from '../signals/WaveSignal';
import { Filter, FilterType } from './Filter';

describe('Filter functions', () => {
  it('should compute the filter taps', () => {
    const taps = new Filter(FilterType.HPF, 5, 8, 2).taps;
    const taps_1 = [0, -0.3183, 0.5, -0.3183, 0];

    taps.forEach((x, i) =>
      expect(math.abs(math.subtract(x, taps_1[i]) as number)).to.be.lessThan(
        1e-4,
      ),
    );
  });

  it('should perform Low Pass filtering on a signal', () => {
    const sig1 = new WaveSignal(WaveSignalType.SINE, 2048, 256, 0);
    const sig2 = new WaveSignal(WaveSignalType.SINE, 2048, 16, 0);

    const sig = new Signal(2048);
    sig.signal = Functions.add([sig1.signal, sig2.signal]);

    // Filtering
    // Cut-off frequencies above 128
    const filt = new Filter(FilterType.LPF, 500, 2048, 128);
    const filtered = new Signal(2048);
    filtered.signal = filt.do_sample_all(sig.signal);
    const filtRes = filtered.getFrequencyResponse();

    // After filtering
    // Expect only 16 Hz to be high
    expect(filtRes[16]).to.be.greaterThan(0.85);
    // Expect all other frequencies to be low
    filtRes
      .slice(0, 16)
      .concat(filtRes.slice(17))
      .forEach((x) => expect(x).to.be.lessThan(0.15));
  });

  it('should perform High Pass filtering on a signal', () => {
    const sig1 = new WaveSignal(WaveSignalType.SINE, 2048, 256, 0);
    const sig2 = new WaveSignal(WaveSignalType.SINE, 2048, 16, 0);

    const sig = new Signal(2048);
    sig.signal = Functions.add([sig1.signal, sig2.signal]);

    // Filtering
    // Cut-off frequencies below 128
    const filt = new Filter(FilterType.HPF, 500, 2048, 128);
    const filtered = new Signal(2048);
    filtered.signal = filt.do_sample_all(sig.signal);
    const filtRes = filtered.getFrequencyResponse();

    // After filtering
    // Expect only 256 Hz to be high
    expect(filtRes[256]).to.be.greaterThan(0.85);
    // Expect all other frequencies to be low
    filtRes
      .slice(0, 256)
      .concat(filtRes.slice(257))
      .forEach((x) => expect(x).to.be.lessThan(0.15));
  });

  it('should perform Band Pass filtering on a signal', () => {
    const sig1 = new WaveSignal(WaveSignalType.SINE, 2048, 256, 0);
    const sig2 = new WaveSignal(WaveSignalType.SINE, 2048, 16, 0);

    const sig = new Signal(2048);
    sig.signal = Functions.add([sig1.signal, sig2.signal]);

    // Filtering
    // Cut-off frequencies bewteen 128 and 512
    const filt = new Filter(FilterType.BPF, 500, 2048, {
      Fl: 128,
      Fu: 512,
    });
    const filtered = new Signal(2048);
    filtered.signal = filt.do_sample_all(sig.signal);
    const filtRes = filtered.getFrequencyResponse();

    // After filtering
    // Expect only 256 Hz to be high
    expect(filtRes[256]).to.be.greaterThan(0.85);
    // Expect all other frequencies to be low
    filtRes
      .slice(0, 256)
      .concat(filtRes.slice(257))
      .forEach((x) => expect(x).to.be.lessThan(0.15));
  });

  it('it should not create a filter with a sampling frequency less than or equal to zero', () => {
    expect(() => new Filter(FilterType.LPF, 500, 0, 128)).to.throw(
      'Fs must be greater than zero.',
    );
    expect(() => new Filter(FilterType.LPF, 500, -100, 128)).to.throw(
      'Fs must be greater than zero.',
    );
  });

  it('it should not create a filter whose number of taps is less than or equal to zero or more than the maximum limit', () => {
    expect(() => new Filter(FilterType.LPF, 0, 1024, 128)).to.throw(
      'num_taps must be greater than zero and less than Filter.MAX_NUM_FILTER_TAPS.',
    );
    expect(
      () =>
        new Filter(FilterType.LPF, Filter.MAX_NUM_FILTER_TAPS + 1, 1024, 128),
    ).to.throw(
      'num_taps must be greater than zero and less than Filter.MAX_NUM_FILTER_TAPS.',
    );
  });

  it('it should not create a Low Pass or High Pass filter if the cutoff frequency is not a number', () => {
    expect(
      () => new Filter(FilterType.LPF, 500, 1024, { Fl: 100, Fu: 1000 }),
    ).to.throw('Fx must be a number for FilterType.LPF and FilterType.HPF.');
    expect(
      () => new Filter(FilterType.HPF, 500, 1024, { Fl: 100, Fu: 1000 }),
    ).to.throw('Fx must be a number for FilterType.LPF and FilterType.HPF.');
  });

  it('it should not create a Low Pass or High Pass filter if the cutoff frequency is less than or equal to zero or greater than Fs / 2', () => {
    // Fx <= 0
    expect(() => new Filter(FilterType.LPF, 500, 1024, 0)).to.throw(
      'Fx must be greater than zero and less than Fs / 2.',
    );
    expect(() => new Filter(FilterType.HPF, 500, 1024, 0)).to.throw(
      'Fx must be greater than zero and less than Fs / 2.',
    );
    // Fx > Fs / 2
    expect(() => new Filter(FilterType.LPF, 500, 1024, 1024)).to.throw(
      'Fx must be greater than zero and less than Fs / 2.',
    );
    expect(() => new Filter(FilterType.HPF, 500, 1024, 1024)).to.throw(
      'Fx must be greater than zero and less than Fs / 2.',
    );
  });

  it('it should not create a Band Pass filter if Fx is not an object containing Fl and Fu', () => {
    // typeof Fx === 'number'
    expect(() => new Filter(FilterType.BPF, 500, 1024, 100)).to.throw(
      'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.',
    );
    // !Fx.Fl
    expect(() => new Filter(FilterType.BPF, 500, 1024, { Fu: 300 })).to.throw(
      'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.',
    );
    // !Fx.Fu
    expect(() => new Filter(FilterType.BPF, 500, 1024, { Fl: 300 })).to.throw(
      'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.',
    );
  });

  it('it should not create a Band Pass filter if the lower cutoff frequency is higher than the upper cutoff frequency', () => {
    expect(
      () => new Filter(FilterType.BPF, 500, 1024, { Fl: 300, Fu: 150 }),
    ).to.throw('Fx.Fu must be greater than Fx.Fl.');
  });

  it('it should not create a Band Pass filter if the lower cutoff frequency is less than or equal to zero or greater than Fs / 2', () => {
    // Fx.Fl <= 0
    expect(
      () => new Filter(FilterType.BPF, 500, 1024, { Fl: -100, Fu: 300 }),
    ).to.throw('Fx.Fl must be greater than zero and less than Fs / 2.');
    // Fx.Fl >= Fs / 2
    expect(
      () => new Filter(FilterType.BPF, 500, 1024, { Fl: 600, Fu: 800 }),
    ).to.throw('Fx.Fl must be greater than zero and less than Fs / 2.');
  });

  it('it should not create a Band Pass filter if the higher cutoff frequency is less than or equal to zero or greater than Fs / 2', () => {
    // Fx.Fu <= 0
    // Never gets evaluated as Fu > Fl > 0

    // Fx.Fu >= Fs / 2
    expect(
      () => new Filter(FilterType.BPF, 500, 1024, { Fl: 100, Fu: 800 }),
    ).to.throw('Fx.Fu must be greater than zero and less than Fs / 2.');
  });
});
