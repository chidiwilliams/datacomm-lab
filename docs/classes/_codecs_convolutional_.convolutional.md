[datacomm-lab - v1.2.0](../README.md) › ["codecs/Convolutional"](../modules/_codecs_convolutional_.md) › [Convolutional](_codecs_convolutional_.convolutional.md)

# Class: Convolutional

Convolutional encoder and decoder

**`export`** 

**`class`** Convolutional

## Hierarchy

* **Convolutional**

## Index

### Constructors

* [constructor](_codecs_convolutional_.convolutional.md#constructor)

### Accessors

* [outputFunc](_codecs_convolutional_.convolutional.md#outputfunc)
* [state](_codecs_convolutional_.convolutional.md#state)
* [symbol](_codecs_convolutional_.convolutional.md#symbol)

### Methods

* [correct](_codecs_convolutional_.convolutional.md#correct)
* [decode](_codecs_convolutional_.convolutional.md#decode)
* [encodeAll](_codecs_convolutional_.convolutional.md#encodeall)
* [encodeOne](_codecs_convolutional_.convolutional.md#encodeone)
* [computeWeights](_codecs_convolutional_.convolutional.md#static-computeweights)
* [decToBin](_codecs_convolutional_.convolutional.md#static-dectobin)
* [padLeft](_codecs_convolutional_.convolutional.md#static-padleft)

## Constructors

###  constructor

\+ **new Convolutional**(`gen`: number[][] | string): *[Convolutional](_codecs_convolutional_.convolutional.md)*

*Defined in [codecs/Convolutional.ts:31](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L31)*

Creates an instance of Convolutional.

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`gen` | number[][] &#124; string | Output function or symbol |

**Returns:** *[Convolutional](_codecs_convolutional_.convolutional.md)*

## Accessors

###  outputFunc

• **get outputFunc**(): *number[][]*

*Defined in [codecs/Convolutional.ts:305](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L305)*

Returns the output function of the convolutional codec

**`readonly`** 

**`type`** {number[][]}

**`memberof`** Convolutional

**Returns:** *number[][]*

___

###  state

• **get state**(): *number[]*

*Defined in [codecs/Convolutional.ts:285](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L285)*

Returns the current state of the codec.

**`type`** {number[]}

**`memberof`** Convolutional

**Returns:** *number[]*

• **set state**(`value`: number[]): *void*

*Defined in [codecs/Convolutional.ts:294](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L294)*

Sets the state of the codec to the given array

**`memberof`** Convolutional

**Parameters:**

Name | Type |
------ | ------ |
`value` | number[] |

**Returns:** *void*

___

###  symbol

• **get symbol**(): *string*

*Defined in [codecs/Convolutional.ts:316](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L316)*

Returns the output function symbol of the convolutional codec

**`readonly`** 

**`type`** {string}

**`memberof`** Convolutional

**Returns:** *string*

## Methods

###  correct

▸ **correct**(`ops`: number[][]): *number[][]*

*Defined in [codecs/Convolutional.ts:267](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L267)*

Returns the corrected array of outputs. The given array is first
decoded using the Viterbi algorithm, and then re-encoded to produce
the correct encoded values.

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ops` | number[][] | Received outputs |

**Returns:** *number[][]*

Corrected outputs

___

###  decode

▸ **decode**(`opStream`: number[][]): *number[]*

*Defined in [codecs/Convolutional.ts:194](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L194)*

Returns the array of inputs that would produce the given array of
outputs through the codec's output function. Decoding is implemented
using the Viterbi decoding algorithm.

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`opStream` | number[][] | Outputs |

**Returns:** *number[]*

Inputs

___

###  encodeAll

▸ **encodeAll**(`inp`: number[]): *number[][]*

*Defined in [codecs/Convolutional.ts:179](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L179)*

Returns an array whose elements correspond to an array of respective
responses of each output to the given inputs as defined by the codec's
output function.

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`inp` | number[] | Input bits |

**Returns:** *number[][]*

Array of encoded outputs

___

###  encodeOne

▸ **encodeOne**(`ip`: number): *number[]*

*Defined in [codecs/Convolutional.ts:152](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L152)*

Returns a single array whose elements correspond to the value of the
response of each output to the input as defined by the codec's
output function.

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ip` | number | Input |

**Returns:** *number[]*

Output array

___

### `Static` computeWeights

▸ **computeWeights**(`arr`: number[], `diffs`: number[][]): *number[]*

*Defined in [codecs/Convolutional.ts:331](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L331)*

Returns the array of weights between arr and each array in
diffs. A weight is defined as the sum of element-wise bit
differences between two arrays.

**`static`** 

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`arr` | number[] | Input array |
`diffs` | number[][] | Array of alternative paths |

**Returns:** *number[]*

Weights

___

### `Static` decToBin

▸ **decToBin**(`n`: number): *number*

*Defined in [codecs/Convolutional.ts:355](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L355)*

Converts a number in base 10 to base 2

**`static`** 

**`memberof`** Convolutional

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *number*

___

### `Static` padLeft

▸ **padLeft**(`s`: string, `n`: number, `w`: string): *string*

*Defined in [codecs/Convolutional.ts:376](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/codecs/Convolutional.ts#L376)*

Pads a given string with another string to the left to the
given width

**`static`** 

**`memberof`** Convolutional

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`s` | string | String to be padded |
`n` | number | Width of the padded result |
`w` | string | String with which to pad |

**Returns:** *string*

Padded result
