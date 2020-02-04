[datacomm-lab - v1.2.0](../README.md) › ["modulations/BPSK"](../modules/_modulations_bpsk_.md) › [BPSK](_modulations_bpsk_.bpsk.md)

# Class: BPSK

**`export`** 

**`class`** BPSK

## Hierarchy

* **BPSK**

## Index

### Constructors

* [constructor](_modulations_bpsk_.bpsk.md#constructor)

### Accessors

* [demodulated](_modulations_bpsk_.bpsk.md#demodulated)
* [modulated](_modulations_bpsk_.bpsk.md#modulated)

### Methods

* [demodulate](_modulations_bpsk_.bpsk.md#demodulate)

## Constructors

###  constructor

\+ **new BPSK**(`baseband`: number[], `carrier`: number[]): *[BPSK](_modulations_bpsk_.bpsk.md)*

*Defined in [modulations/BPSK.ts:12](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/modulations/BPSK.ts#L12)*

Creates an instance of BPSK.

**`memberof`** BPSK

**Parameters:**

Name | Type |
------ | ------ |
`baseband` | number[] |
`carrier` | number[] |

**Returns:** *[BPSK](_modulations_bpsk_.bpsk.md)*

## Accessors

###  demodulated

• **get demodulated**(): *number[]*

*Defined in [modulations/BPSK.ts:79](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/modulations/BPSK.ts#L79)*

Get demodulated signal array

**`readonly`** 

**`type`** {number[]}

**`memberof`** BPSK

**Returns:** *number[]*

___

###  modulated

• **get modulated**(): *number[]*

*Defined in [modulations/BPSK.ts:68](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/modulations/BPSK.ts#L68)*

Get modulated signal array

**`readonly`** 

**`type`** {number[]}

**`memberof`** BPSK

**Returns:** *number[]*

## Methods

###  demodulate

▸ **demodulate**(`rec`: number[]): *number[]*

*Defined in [modulations/BPSK.ts:91](https://github.com/chidiwilliams/datacomm-lab/blob/dd30902/src/modulations/BPSK.ts#L91)*

Get the demodulated signal using a received signal array and
the previous carrier signal

**`memberof`** BPSK

**Parameters:**

Name | Type |
------ | ------ |
`rec` | number[] |

**Returns:** *number[]*
