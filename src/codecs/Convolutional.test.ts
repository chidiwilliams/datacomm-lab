import { expect } from 'chai';
import { Convolutional } from './Convolutional';

describe('Convolutional codec tests', () => {
  it('should create a convolutional codec with an output function', () => {
    const conv = new Convolutional([
      [1, 0, 1, 0],
      [1, 1, 1, 0],
    ]);

    expect(conv.outputFunc).to.eql([
      [1, 0, 1, 0],
      [1, 1, 1, 0],
    ]);
    expect(conv.state).to.eql([0, 0, 0, 0]);
    expect(conv.symbol).to.equal('4.10.14');
  });

  it('should create a convolutional codec with an output function with non-binary values', () => {
    expect(
      () =>
        new Convolutional([
          [1, 2, 1, 0],
          [1, 1, 1, 0],
        ]),
    ).to.throw('Only binary inputs allowed.');
  });

  it('should create a convolutional codec with an output symbol', () => {
    const conv = new Convolutional('4.10.14');

    expect(conv.symbol).to.equal('4.10.14');
    expect(conv.outputFunc).to.eql([
      [1, 0, 1, 0],
      [1, 1, 1, 0],
    ]);
    expect(conv.state).to.eql([0, 0, 0, 0]);
  });

  it('should encode a single input', () => {
    const conv = new Convolutional('4.10.14');
    expect(conv.encodeOne(1)).to.eql([1, 1]);
  });

  it('should encode an array of inputs', () => {
    const conv = new Convolutional('4.10.14');
    expect(conv.encodeAll([1, 0, 0, 1])).to.eql([
      [1, 1],
      [0, 1],
      [1, 1],
      [1, 1],
    ]);
  });

  it('should decode an array of outputs', () => {
    const conv = new Convolutional('4.10.14');
    expect(
      conv.decode([
        [1, 1],
        [1, 0],
        [1, 0],
        [0, 0],
      ]),
    ).to.eql([1, 1, 0, 1]);
  });

  it("should not decode an array of outputs if the given number of outputs do not equal the codec's number of outputs", () => {
    const conv = new Convolutional('4.10.14');
    expect(() =>
      conv.decode([
        [1, 1, 1],
        [1, 0],
        [1, 0],
        [0, 0],
      ]),
    ).to.throw('Invalid number of outputs.');
  });

  it('should not decode an array of outputs if the given encoded array contains non-binary values', () => {
    const conv = new Convolutional('4.10.14');
    expect(() =>
      conv.decode([
        [1, 2],
        [3, 0],
        [1, 0],
        [0, 0],
      ]),
    ).to.throw('Only binary inputs allowed.');
  });

  it('should correct an array of outputs', () => {
    const conv = new Convolutional('4.10.14.12');

    expect(
      conv.correct([
        [1, 0, 1],
        [1, 0, 0],
        [1, 0, 1],
        [0, 0, 1],
        [0, 0, 0],
        [0, 1, 0],
      ]),
    ).to.eql([
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
      [1, 0, 0],
      [0, 1, 0],
    ]);
  });

  it('should set the state of the convolutional codec', () => {
    const conv = new Convolutional('4.10.14.12');
    const x = [0, 1, 1, 0];
    conv.state = x.slice(0);
    expect(conv.state).to.eql(x);
  });

  it('should compute the weights between an array and other arrays', () => {
    expect(
      Convolutional.computeWeights(
        [1, 1, 1],
        [
          [1, 1, 0],
          [0, 0, 1],
          [0, 0, 0],
        ],
      ),
    ).to.eql([1, 2, 3]);
  });

  it('should not compute the weights between an array and other arrays if the lengths of the arrays are not equal', () => {
    expect(() =>
      Convolutional.computeWeights(
        [1, 1, 1, 1],
        [
          [1, 1, 0],
          [0, 0, 1],
          [0, 0, 0],
        ],
      ),
    ).to.throw('Arrays must be of equal length.');
  });

  it('should left-pad a string with another string', () => {
    expect(Convolutional.padLeft('hello', 10, '0')).to.equal('00000hello');
  });

  it('should not left-pad a string with another string if the length of the string to be padded is greater than the given pad width', () => {
    expect(() => Convolutional.padLeft('hello', 2, '0')).to.throw(
      'Width must be larger than the string.',
    );
  });
});
