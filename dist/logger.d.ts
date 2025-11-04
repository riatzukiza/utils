export type LogFields = Record<string, unknown>;
export type Level = "debug" | "info" | "warn" | "error";
export type LogMethod = (msg: string, fields?: LogFields) => void;
export type Logger = {
    readonly debug: LogMethod;
    readonly info: LogMethod;
    readonly warn: LogMethod;
    readonly error: LogMethod;
    readonly audit: LogMethod;
    readonly child: (extra: LogFields) => Logger;
};
export type LoggerConfig = {
    readonly service: string;
    readonly level?: Level;
    readonly json?: boolean;
    readonly base?: LogFields;
    readonly stream?: NodeJS.WritableStream;
    readonly silent?: boolean;
};
export declare function createLogger(config: LoggerConfig): Logger;
//# sourceMappingURL=logger.d.ts.map