export type Newtype<URI, A> = {
    readonly _URI: URI;
    readonly _A: A;
};
export type WithDefaults<T> = Required<T>;
export type ColumnHeader = string | {
    key: string;
    displayLabel: string;
};
export type ConfigOptions = {
    filename?: string;
    fieldSeparator?: string;
    quoteStrings?: boolean;
    quoteCharacter?: string;
    decimalSeparator?: string;
    showColumnHeaders?: boolean;
    showTitle?: boolean;
    title?: string;
    useTextFile?: boolean;
    useBom?: boolean;
    columnHeaders?: Array<ColumnHeader>;
    useKeysAsHeaders?: boolean;
    boolDisplay?: {
        true: string;
        false: string;
    };
    replaceUndefinedWith?: string | boolean | null;
};
export type HeaderKey = Newtype<{
    readonly HeaderKey: unique symbol;
}, string>;
export type HeaderDisplayLabel = Newtype<{
    readonly HeaderDisplayLabel: unique symbol;
}, string>;
export type CsvOutput = Newtype<{
    readonly CsvOutput: unique symbol;
}, string>;
export type CsvRow = Newtype<{
    readonly CsvRow: unique symbol;
}, string>;
export type IO = void;
export declare const pack: <T extends Newtype<any, any>>(value: T["_A"]) => T;
export declare const unpack: <T extends Newtype<any, any>>(newtype: T) => T["_A"];
export declare const mkCsvOutput: (value: string) => CsvOutput;
export declare const mkCsvRow: (value: string) => CsvRow;
export declare const mkHeaderKey: (value: string) => HeaderKey;
export declare const mkHeaderDisplayLabel: (value: string) => HeaderDisplayLabel;
