'use strict';
const expect = require('chai').expect;
const index = require('../dist/index');
const { Signal } = require('../dist/signals/Signal');
const { ComplexSignal } = require('../dist/signals/ComplexSignal');

describe('should create Signal', () => {
  it('should create signal', () => {
    const signal = new ComplexSignal(2048);
    expect(signal.signal).to.be.an('array');
  });
});
