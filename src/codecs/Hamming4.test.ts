import { expect } from 'chai';
import { Hamming4 } from './Hamming4';

describe('Hamming-7,4 codec tests', () => {
  // Encoding
  it('should encode', () => {
    const enc = new Hamming4().encode([1, 0, 1, 0]);
    expect(enc).to.eql([1, 0, 1, 1, 0, 1, 0]);
  });

  it('should encode and add parity bit', () => {
    const enc = new Hamming4().encode([1, 1, 1, 0], true);
    expect(enc).to.eql([0, 0, 1, 0, 1, 1, 0, 1]);
  });

  it('should not encode an array of length not equal to 4', () => {
    const hamm = new Hamming4();
    expect(() => hamm.encode([1, 0, 1, 0, 1])).to.throw(
      'Input array must have a length of 4.',
    );
  });

  it('should not encode an array with non-binary values', () => {
    const hamm = new Hamming4();
    expect(() => hamm.encode([1, 5, 1, 0])).to.throw(
      'Input array must contain only zeros and ones.',
    );
  });

  // Decoding
  it('should decode', () => {
    const dec = new Hamming4().decode([1, 0, 1, 0, 1, 0, 1]);
    expect(dec).to.eql([1, 1, 0, 1]);
  });

  it('should not decode an array of length not equal to 7', () => {
    const hamm = new Hamming4();
    expect(() => hamm.decode([1, 0, 1, 0, 1, 0, 1, 0])).to.throw(
      'Input array must have a length of 7.',
    );
  });

  // Correction
  it('should correct single-bit zero error', () => {
    const cor = new Hamming4().correct([1, 0, 0, 0, 1, 0, 1]);
    expect(cor).to.eql([1, 0, 1, 0, 1, 0, 1]);
  });

  it('should correct single-bit one error', () => {
    const cor = new Hamming4().correct([1, 1, 1, 0, 1, 0, 0]);
    expect(cor).to.eql([1, 1, 1, 0, 0, 0, 0]);
  });

  it('should not correct an array of length not equal to 7', () => {
    const hamm = new Hamming4();
    expect(() => hamm.correct([1, 0, 1, 0, 1, 0])).to.throw(
      'Input array must have a length of 7.',
    );
  });
});
