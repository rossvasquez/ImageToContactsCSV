/// <reference lib="dom" />
import { CsvOutput, ConfigOptions, IO } from "./types";
/**
 *
 * Generates CsvOutput data from JSON collection using
 * ConfigOptions given.
 *
 * To comfortably use the data as a string around your
 * application, look at {@link asString}.
 *
 * @throws {CsvGenerationError | EmptyHeadersError}
 */
export declare const generateCsv: (config: ConfigOptions) => <T extends {
    [k: string]: unknown;
    [k: number]: unknown;
}>(data: T[]) => CsvOutput;
/**
 *
 * **Only supported in browser environment.**
 *
 * Will create a hidden anchor link in the page with the
 * download attribute set to a blob version of the CsvOutput data.
 *
 * @throws {CsvDownloadEnvironmentError}
 */
export declare const download: (config: ConfigOptions) => (csvOutput: CsvOutput) => IO;
