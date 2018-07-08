export declare class Hamming4 {
    private static GEN_MATRIX;
    private static CHECK_MATRIX;
    private static DECODE_MATRIX;
    encode(m: number[], par?: boolean): number[];
    decode(rec: number[]): number[];
    correct(rec: number[]): number[];
    private getErrorBit;
    private getSyndrome;
}
