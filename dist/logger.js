import { Writable } from "node:stream";
const levelOrder = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
};
const NULL_STREAM = new Writable({
    write(_chunk, _encoding, callback) {
        callback();
    },
});
function parseLevel(l) {
    const raw = (l || process.env.LOG_LEVEL || "info").toLowerCase();
    if (raw === "debug" || raw === "info" || raw === "warn" || raw === "error")
        return raw;
    return "info";
}
function parseJson(flag) {
    if (typeof flag === "boolean")
        return flag;
    return /^true$/i.test(process.env.LOG_JSON || "false");
}
function parseBoolEnv(value) {
    if (value === undefined)
        return undefined;
    if (/^(1|true|yes)$/i.test(value))
        return true;
    if (/^(0|false|no)$/i.test(value))
        return false;
    return undefined;
}
function resolveSilent(explicit, hasCustomStream) {
    if (typeof explicit === "boolean")
        return explicit;
    const fromEnv = parseBoolEnv(process.env.LOG_SILENT);
    if (typeof fromEnv === "boolean")
        return fromEnv;
    if (process.env.NODE_ENV === "test" && !hasCustomStream)
        return true;
    return false;
}
function now() {
    return new Date().toISOString();
}
const formatLine = (json, payload) => json
    ? JSON.stringify(payload)
    : `[${payload.ts}] ${payload.service} ${payload.level.toUpperCase()}: ${payload.msg}`;
const createEmitter = (context) => (lvl, msg, fields, force = false) => {
    if (!force &&
        lvl !== "audit" &&
        levelOrder[lvl] < levelOrder[context.level]) {
        return;
    }
    const payload = {
        ts: now(),
        level: lvl,
        service: context.service,
        ...context.base,
        ...(fields ?? {}),
        msg,
    };
    try {
        const line = formatLine(context.json, payload);
        context.stream.write(`${line}\n`);
    }
    catch {
        // ignore stream errors
    }
};
const resolveStream = (silent, stream) => {
    if (stream)
        return stream;
    return silent ? NULL_STREAM : process.stdout;
};
export function createLogger(config) {
    const { service, base = {} } = config;
    const hasCustomStream = config.stream !== undefined;
    const silent = resolveSilent(config.silent, hasCustomStream);
    const level = config.level ?? parseLevel();
    const json = config.json ?? parseJson();
    const stream = resolveStream(silent, config.stream);
    const context = { base, json, level, service, stream };
    const emit = createEmitter(context);
    return {
        debug: (msg, fields) => emit("debug", msg, fields),
        info: (msg, fields) => emit("info", msg, fields),
        warn: (msg, fields) => emit("warn", msg, fields),
        error: (msg, fields) => emit("error", msg, fields),
        audit: (msg, fields) => emit("audit", msg, fields, true),
        child: (extra) => createLogger({
            service,
            level,
            json,
            base: { ...base, ...extra },
            stream,
            silent,
        }),
    };
}
//# sourceMappingURL=logger.js.map