[datacomm-lab - v1.2.0](../README.md) › ["signals/Signal"](../modules/_signals_signal_.md) › [Signal](_signals_signal_.signal.md)

# Class: Signal

**`export`** 

**`class`** Signal

## Hierarchy

* **Signal**

  ↳ [WaveSignal](_signals_wavesignal_.wavesignal.md)

## Index

### Constructors

* [constructor](_signals_signal_.signal.md#constructor)

### Accessors

* [Fs](_signals_signal_.signal.md#fs)
* [signal](_signals_signal_.signal.md#signal)

### Methods

* [getBinaryThresholds](_signals_signal_.signal.md#getbinarythresholds)
* [getFrequencyResponse](_signals_signal_.signal.md#getfrequencyresponse)
* [getSignalValue](_signals_signal_.signal.md#getsignalvalue)
* [sample](_signals_signal_.signal.md#sample)
* [setSignalValue](_signals_signal_.signal.md#setsignalvalue)

## Constructors

###  constructor

\+ **new Signal**(`Fs`: number): *[Signal](_signals_signal_.signal.md)*

*Defined in [signals/Signal.ts:11](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L11)*

Creates an instance of Signal.

**`memberof`** Signal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Fs` | number | Sampling frequency |

**Returns:** *[Signal](_signals_signal_.signal.md)*

## Accessors

###  Fs

• **get Fs**(): *number*

*Defined in [signals/Signal.ts:55](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L55)*

Get the sampling frequency given as the length of the signal

**`readonly`** 

**`type`** {number}

**`memberof`** Signal

**Returns:** *number*

___

###  signal

• **get signal**(): *number[]*

*Defined in [signals/Signal.ts:31](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L31)*

Get the signal array

**`type`** {number[]}

**`memberof`** Signal

**Returns:** *number[]*

• **set signal**(`signal`: number[]): *void*

*Defined in [signals/Signal.ts:40](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L40)*

Set the signal array

**`memberof`** Signal

**Parameters:**

Name | Type |
------ | ------ |
`signal` | number[] |

**Returns:** *void*

## Methods

###  getBinaryThresholds

▸ **getBinaryThresholds**(`num_thresh`: number): *number[]*

*Defined in [signals/Signal.ts:135](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L135)*

First, samples the signal at the value specified by num_thresh. Then,
resamples the new signal at the original signal sampling frequency, and
converts each value to 1 (if the value is greater than 0) or 0 (if the
value is less than or equal to zero).

**`memberof`** Signal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`num_thresh` | number | Number of threshold points to represent |

**Returns:** *number[]*

Binary thresholds array

___

###  getFrequencyResponse

▸ **getFrequencyResponse**(): *number[]*

*Defined in [signals/Signal.ts:147](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L147)*

Returns the frequency magnitude response of the signal

**`memberof`** Signal

**Returns:** *number[]*

Frequency magnitude response array

___

###  getSignalValue

▸ **getSignalValue**(`index`: number): *number*

*Defined in [signals/Signal.ts:66](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L66)*

Get the value of the signal at a sample value

**`memberof`** Signal

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *number*

___

###  sample

▸ **sample**(`Fs`: number): *number[]*

*Defined in [signals/Signal.ts:92](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L92)*

Returns the signal sampled at the given frequency. If the new
sampling frequency is higher than the current signal sampling
frequency, it must be a multiple of the current signal sampling
frequency. If it is lower, it must be a factor of the current
signal sampling frequency.

**`memberof`** Signal

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`Fs` | number | New sampling frequency |

**Returns:** *number[]*

Sampled signal array

___

###  setSignalValue

▸ **setSignalValue**(`index`: number, `value`: number): *void*

*Defined in [signals/Signal.ts:77](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/signals/Signal.ts#L77)*

Set the value of the signal at a sample value

**`memberof`** Signal

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |
`value` | number |

**Returns:** *void*
