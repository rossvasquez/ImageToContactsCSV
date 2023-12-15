import { WithDefaults, ConfigOptions } from "./types";
export declare const defaults: WithDefaults<ConfigOptions>;
export declare const endOfLine = "\r\n";
export declare const byteOrderMark = "\uFEFF";
export declare const mkConfig: (opts: ConfigOptions) => WithDefaults<ConfigOptions>;
