const expect = require('chai').expect;
const lab = require('../../dist');
const math = require('mathjs');

const taps = () => {
  const taps = new lab.Filter(lab.FilterType.HPF, 5, 8, 2).taps;
  const taps_1 = [0, -0.3183, 0.5, -0.3183, 0];

  taps.forEach((x, i) =>
    expect(math.abs(math.subtract(x, taps_1[i]))).to.be.lessThan(1e-4)
  );
};

const LP = () => {
  const sig1 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 256, 0);
  const sig2 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 16, 0);

  const sig = new lab.Signal(2048);
  sig.signal = lab.Functions.add([sig1.signal, sig2.signal]);
  const sigRes = sig.getFrequencyResponse();

  // Filtering
  // Cut-off frequencies above 128
  const filt = new lab.Filter(lab.FilterType.LPF, 500, 2048, 128);
  const filtered = new lab.Signal(2048);
  filtered.signal = sig.signal.map((x) => filt.do_sample(x));
  const filtRes = filtered.getFrequencyResponse();

  // After filtering
  // Expect only 16 Hz to be high
  expect(filtRes[16]).to.be.greaterThan(0.85);
  // Expect all other frequencies to be low
  filtRes
    .slice(0, 16)
    .concat(filtRes.slice(17))
    .forEach((x) => expect(x).to.be.lessThan(0.15));
};

const HP = () => {
  const sig1 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 256, 0);
  const sig2 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 16, 0);

  const sig = new lab.Signal(2048);
  sig.signal = lab.Functions.add([sig1.signal, sig2.signal]);
  const sigRes = sig.getFrequencyResponse();

  // Filtering
  // Cut-off frequencies below 128
  const filt = new lab.Filter(lab.FilterType.HPF, 500, 2048, 128);
  const filtered = new lab.Signal(2048);
  filtered.signal = sig.signal.map((x) => filt.do_sample(x));
  const filtRes = filtered.getFrequencyResponse();

  // After filtering
  // Expect only 256 Hz to be high
  expect(filtRes[256]).to.be.greaterThan(0.85);
  // Expect all other frequencies to be low
  filtRes
    .slice(0, 256)
    .concat(filtRes.slice(257))
    .forEach((x) => expect(x).to.be.lessThan(0.15));
};

const BP = () => {
  const sig1 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 256, 0);
  const sig2 = new lab.WaveSignal(lab.WaveSignalType.SINE, 2048, 16, 0);

  const sig = new lab.Signal(2048);
  sig.signal = lab.Functions.add([sig1.signal, sig2.signal]);
  const sigRes = sig.getFrequencyResponse();

  // Filtering
  // Cut-off frequencies bewteen 128 and 512
  const filt = new lab.Filter(lab.FilterType.BPF, 500, 2048, {
    Fl: 128,
    Fu: 512,
  });
  const filtered = new lab.Signal(2048);
  filtered.signal = sig.signal.map((x) => filt.do_sample(x));
  const filtRes = filtered.getFrequencyResponse();

  // After filtering
  // Expect only 256 Hz to be high
  expect(filtRes[256]).to.be.greaterThan(0.85);
  // Expect all other frequencies to be low
  filtRes
    .slice(0, 256)
    .concat(filtRes.slice(257))
    .forEach((x) => expect(x).to.be.lessThan(0.15));
};

const rejectCreateForZeroOrLessFs = () => {
  expect(() => new lab.Filter(lab.FilterType.LPF, 500, 0, 128)).to.throw(
    'Fs must be greater than zero.'
  );
  expect(() => new lab.Filter(lab.FilterType.LPF, 500, -100, 128)).to.throw(
    'Fs must be greater than zero.'
  );
};

const rejectCreateForOOBNumTaps = () => {
  expect(() => new lab.Filter(lab.FilterType.LPF, 0, 1024, 128)).to.throw(
    'num_taps must be greater than zero and less than Filter.MAX_NUM_FILTER_TAPS.'
  );
  expect(
    () =>
      new lab.Filter(
        lab.FilterType.LPF,
        lab.Filter.MAX_NUM_FILTER_TAPS + 1,
        1024,
        128
      )
  ).to.throw(
    'num_taps must be greater than zero and less than Filter.MAX_NUM_FILTER_TAPS.'
  );
};

const rejectLPHPForNonNumFs = () => {
  expect(
    () => new lab.Filter(lab.FilterType.LPF, 500, 1024, { Fl: 100, Fu: 1000 })
  ).to.throw('Fx must be a number for FilterType.LPF and FilterType.HPF.');
  expect(
    () => new lab.Filter(lab.FilterType.HPF, 500, 1024, { Fl: 100, Fu: 1000 })
  ).to.throw('Fx must be a number for FilterType.LPF and FilterType.HPF.');
};

const rejectLPHPForOOBFx = () => {
  // Fx <= 0
  expect(() => new lab.Filter(lab.FilterType.LPF, 500, 1024, 0)).to.throw(
    'Fx must be greater than zero and less than Fs / 2.'
  );
  expect(() => new lab.Filter(lab.FilterType.HPF, 500, 1024, 0)).to.throw(
    'Fx must be greater than zero and less than Fs / 2.'
  );
  // Fx > Fs / 2
  expect(() => new lab.Filter(lab.FilterType.LPF, 500, 1024, 1024)).to.throw(
    'Fx must be greater than zero and less than Fs / 2.'
  );
  expect(() => new lab.Filter(lab.FilterType.HPF, 500, 1024, 1024)).to.throw(
    'Fx must be greater than zero and less than Fs / 2.'
  );
};

const rejectBPForIllFx = () => {
  // typeof Fx === 'number'
  expect(() => new lab.Filter(lab.FilterType.BPF, 500, 1024, 100)).to.throw(
    'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.'
  );
  // !Fx.Fl
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fu: 300 })
  ).to.throw(
    'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.'
  );
  // !Fx.Fu
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fl: 300 })
  ).to.throw(
    'Fx must be an object ({ Fl: number, Fu: number }) for FilterType.BPF.'
  );
};

const rejectBPForFlHigherThanFu = () => {
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fl: 300, Fu: 150 })
  ).to.throw('Fx.Fu must be greater than Fx.Fl.');
};

const rejectBPForOOBFl = () => {
  // Fx.Fl <= 0
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fl: -100, Fu: 300 })
  ).to.throw('Fx.Fl must be greater than zero and less than Fs / 2.');
  // Fx.Fl >= Fs / 2
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fl: 600, Fu: 800 })
  ).to.throw('Fx.Fl must be greater than zero and less than Fs / 2.');
};

const rejectBPForOOBFu = () => {
  // Fx.Fu <= 0
  // Never gets evaluated as Fu > Fl > 0

  // Fx.Fu >= Fs / 2
  expect(
    () => new lab.Filter(lab.FilterType.BPF, 500, 1024, { Fl: 100, Fu: 800 })
  ).to.throw('Fx.Fu must be greater than zero and less than Fs / 2.');
};

module.exports = {
  taps,
  LP,
  HP,
  BP,
  rejectCreateForZeroOrLessFs,
  rejectCreateForOOBNumTaps,
  rejectLPHPForNonNumFs,
  rejectLPHPForOOBFx,
  rejectBPForIllFx,
  rejectBPForFlHigherThanFu,
  rejectBPForOOBFl,
  rejectBPForOOBFu,
};
