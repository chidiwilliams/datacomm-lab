import { Signal } from './Signal';
export declare class WaveSignal extends Signal {
    private _Fa;
    private _phi;
    constructor(type: WaveSignalType, Fs: number, Fa: number, phi?: number);
}
export declare enum WaveSignalType {
    'SINE' = 0,
    'SQUARE' = 1,
    'TRIANGULAR' = 2
}
