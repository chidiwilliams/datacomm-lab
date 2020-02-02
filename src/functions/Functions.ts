import * as math from 'mathjs';

/**
 *
 *
 * @export
 * @class FFT
 */
export class Functions {
  /**
   * Computes the Fast Fourier Transform of a signal
   * using Radix-2 Cooley-Tukey algorithm
   *
   * @param {math.Complex[]} x Signal in time-domain
   * @returns {math.Complex[]} Signal in frequency-domain
   * @memberof FFT
   */
  public static fft(x: math.Complex[]): math.Complex[] {
    // Base case
    if (x.length === 1) {
      return [x[0]];
    }

    if (!Functions.isRadix2(x.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    // FFT of even terms
    const even: math.Complex[] = new Array(x.length / 2);
    for (let i = 0; i < x.length / 2; i++) {
      even[i] = x[2 * i];
    }
    const p: math.Complex[] = this.fft(even);

    // FFT of odd terms
    // Reuse array
    const odd: math.Complex[] = even;
    for (let i = 0; i < x.length / 2; i++) {
      odd[i] = x[2 * i + 1];
    }
    const q: math.Complex[] = this.fft(odd);

    // Combine
    const y: math.Complex[] = new Array(x.length);
    for (let i = 0; i < x.length / 2; i++) {
      const kth = (-2 * i * Math.PI) / x.length;
      const wk = math.complex(Math.cos(kth), Math.sin(kth));

      y[i] = math.complex(math.add(p[i], math.multiply(wk, q[i])).toString());
      y[i + x.length / 2] = math.complex(
        math.subtract(p[i], math.multiply(wk, q[i])).toString(),
      );
    }

    return y;
  }

  /**
   * Computes the Inverse Fast Fourier Transform of a signal
   *
   * @param {math.Complex[]} x Signal in frequency-domain
   * @returns {math.Complex[]} Signal in time-domain
   * @memberof FFT
   */
  public static ifft(x: math.Complex[]): math.Complex[] {
    if (!Functions.isRadix2(x.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    // Take conjugate
    let y: math.Complex[] = x.map((i) => math.complex(math.conj(i).toString()));

    // Compute forward FFT
    y = this.fft(y);

    // Take conjugate again
    y = y.map((i) => math.complex(math.conj(i).toString()));

    // Divide by array length
    y = y.map((i) => math.complex(math.divide(i, x.length).toString()));

    return y;
  }

  /**
   * Returns the circular, or cyclic, convolution of two signals,
   * representing the IFFT of the point-wise product of the FFTs of the
   * individual signals.
   *
   * @param {math.Complex[]} x Signal 1
   * @param {math.Complex[]} y Signal 2
   * @returns {math.Complex[]} Circular convolution result
   * @memberof FFT
   */
  public static cconvolve(
    x: math.Complex[],
    y: math.Complex[],
  ): math.Complex[] {
    if (x.length !== y.length) {
      throw new Error('Arrays must have equal lengths.');
    }

    if (!Functions.isRadix2(x.length) || !Functions.isRadix2(y.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    // Compute FFT of each sequence
    const a: math.Complex[] = this.fft(x);
    const b: math.Complex[] = this.fft(y);

    // Point-wise multiplication
    const c: math.Complex[] = new Array(x.length);
    for (let i = 0; i < x.length; i++) {
      c[i] = math.complex(math.multiply(a[i], b[i]).toString());
    }

    // Compute inverse FFT
    return this.ifft(c);
  }

  /**
   * Returns the convolution of two signals
   *
   * @param {math.Complex[]} x Signal 1
   * @param {math.Complex[]} y Signal 2
   * @returns {math.Complex[]} Convolution result
   * @memberof FFT
   */
  public static convolve(x: math.Complex[], y: math.Complex[]): math.Complex[] {
    if (x.length !== y.length) {
      throw new Error('Arrays must have equal lengths.');
    }

    if (!Functions.isRadix2(x.length) || !Functions.isRadix2(y.length)) {
      throw new Error('Signal sampling frequency must be a power of 2.');
    }

    const ZERO: math.Complex = math.complex(0, 0);

    let a: math.Complex[] = new Array(2 * x.length);
    a = x.slice(0);
    for (let i = x.length; i < 2 * x.length; i++) {
      a[i] = ZERO;
    }

    let b: math.Complex[] = new Array(2 * y.length);
    b = y.slice(0);
    for (let i = y.length; i < 2 * y.length; i++) {
      b[i] = ZERO;
    }

    return Functions.cconvolve(a, b);
  }

  /**
   * Returns true if n is a power of 2. Else, returns false.
   *
   * @static
   * @param {number} n Number
   * @returns {boolean} Result
   * @memberof Functions
   */
  public static isRadix2(n: number): boolean {
    if (n <= 0 || n % 2 !== 0) return false;
    if (n === 2) return true;
    return Functions.isRadix2(n / 2);
  }

  /**
   * Returns the element-wise addition of the arrays
   *
   * @static
   * @param {number[][]} x Array of arrays containting numbers
   * @returns {number[]} Array of addition
   * @memberof Functions
   */
  public static add(x: number[][]): number[] {
    for (let i = 0; i < x.length - 1; i++) {
      if (x[i].length !== x[i + 1].length) {
        throw new Error('Arrays must have equal lengths.');
      }
    }

    const y: number[] = new Array(x[0].length);
    for (let i = 0; i < y.length; i++) {
      let sum = 0;
      for (let j = 0; j < x.length; j++) {
        sum += x[j][i];
      }
      y[i] = sum;
    }

    return y;
  }
}
