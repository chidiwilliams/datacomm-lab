[datacomm-lab - v1.2.0](../README.md) › ["filters/Filter"](../modules/_filters_filter_.md) › [Filter](_filters_filter_.filter.md)

# Class: Filter

## Hierarchy

* **Filter**

## Index

### Constructors

* [constructor](_filters_filter_.filter.md#constructor)

### Properties

* [MAX_NUM_FILTER_TAPS](_filters_filter_.filter.md#static-max_num_filter_taps)

### Accessors

* [taps](_filters_filter_.filter.md#taps)

### Methods

* [do_sample](_filters_filter_.filter.md#do_sample)
* [do_sample_all](_filters_filter_.filter.md#do_sample_all)

## Constructors

###  constructor

\+ **new Filter**(`filt_t`: [FilterType](../enums/_filters_filter_.filtertype.md), `num_taps`: number, `Fs`: number, `Fx`: number | FilterFreq): *[Filter](_filters_filter_.filter.md)*

*Defined in [filters/Filter.ts:14](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/filters/Filter.ts#L14)*

Creates an instance of Filter.

**`memberof`** Filter

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`filt_t` | [FilterType](../enums/_filters_filter_.filtertype.md) | Filter type |
`num_taps` | number | Number of filter taps |
`Fs` | number | Sampling frequency |
`Fx` | number &#124; FilterFreq | Cutoff frequency / frequencies |

**Returns:** *[Filter](_filters_filter_.filter.md)*

## Properties

### `Static` MAX_NUM_FILTER_TAPS

▪ **MAX_NUM_FILTER_TAPS**: *number* = 1000

*Defined in [filters/Filter.ts:14](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/filters/Filter.ts#L14)*

## Accessors

###  taps

• **get taps**(): *number[]*

*Defined in [filters/Filter.ts:203](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/filters/Filter.ts#L203)*

Returns the filter taps

**`readonly`** 

**`type`** {number[]} Array of filter taps

**`memberof`** Filter

**Returns:** *number[]*

## Methods

###  do_sample

▸ **do_sample**(`samp`: number): *number*

*Defined in [filters/Filter.ts:168](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/filters/Filter.ts#L168)*

Filters a single input sample.

**`memberof`** Filter

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`samp` | number | Input sample |

**Returns:** *number*

Filtered sample

___

###  do_sample_all

▸ **do_sample_all**(`samps`: number[]): *number[]*

*Defined in [filters/Filter.ts:192](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/filters/Filter.ts#L192)*

Filters an array of samples.

**`memberof`** Filter

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`samps` | number[] | Array of samples |

**Returns:** *number[]*

Array of filtered samples
