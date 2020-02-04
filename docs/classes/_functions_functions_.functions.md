[datacomm-lab - v1.2.0](../README.md) › ["functions/Functions"](../modules/_functions_functions_.md) › [Functions](_functions_functions_.functions.md)

# Class: Functions

**`export`** 

**`class`** FFT

## Hierarchy

* **Functions**

## Index

### Methods

* [add](_functions_functions_.functions.md#static-add)
* [cconvolve](_functions_functions_.functions.md#static-cconvolve)
* [convolve](_functions_functions_.functions.md#static-convolve)
* [fft](_functions_functions_.functions.md#static-fft)
* [ifft](_functions_functions_.functions.md#static-ifft)
* [isRadix2](_functions_functions_.functions.md#static-isradix2)

## Methods

### `Static` add

▸ **add**(`x`: number[][]): *number[]*

*Defined in [functions/Functions.ts:177](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L177)*

Returns the element-wise addition of the arrays

**`static`** 

**`memberof`** Functions

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | number[][] | Array of arrays containting numbers |

**Returns:** *number[]*

Array of addition

___

### `Static` cconvolve

▸ **cconvolve**(`x`: Complex[], `y`: Complex[]): *Complex[]*

*Defined in [functions/Functions.ts:95](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L95)*

Returns the circular, or cyclic, convolution of two signals,
representing the IFFT of the point-wise product of the FFTs of the
individual signals.

**`memberof`** FFT

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Complex[] | Signal 1 |
`y` | Complex[] | Signal 2 |

**Returns:** *Complex[]*

Circular convolution result

___

### `Static` convolve

▸ **convolve**(`x`: Complex[], `y`: Complex[]): *Complex[]*

*Defined in [functions/Functions.ts:129](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L129)*

Returns the convolution of two signals

**`memberof`** FFT

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Complex[] | Signal 1 |
`y` | Complex[] | Signal 2 |

**Returns:** *Complex[]*

Convolution result

___

### `Static` fft

▸ **fft**(`x`: Complex[]): *Complex[]*

*Defined in [functions/Functions.ts:18](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L18)*

Computes the Fast Fourier Transform of a signal
using Radix-2 Cooley-Tukey algorithm

**`memberof`** FFT

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Complex[] | Signal in time-domain |

**Returns:** *Complex[]*

Signal in frequency-domain

___

### `Static` ifft

▸ **ifft**(`x`: Complex[]): *Complex[]*

*Defined in [functions/Functions.ts:65](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L65)*

Computes the Inverse Fast Fourier Transform of a signal

**`memberof`** FFT

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`x` | Complex[] | Signal in frequency-domain |

**Returns:** *Complex[]*

Signal in time-domain

___

### `Static` isRadix2

▸ **isRadix2**(`n`: number): *boolean*

*Defined in [functions/Functions.ts:163](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/functions/Functions.ts#L163)*

Returns true if n is a power of 2. Else, returns false.

**`static`** 

**`memberof`** Functions

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`n` | number | Number |

**Returns:** *boolean*

Result
