/**
 * Minimal CLI argument parser.
 */
/**
 * Parse command-line arguments using provided defaults.
 *
 * @typeParam T - Map of flag names to their default value types.
 * @param defaults - Expected flags with their default values.
 * @param argv - Arguments to parse, defaulting to `process.argv.slice(2)`.
 * @returns An object with the same keys as `defaults`; boolean defaults yield
 * booleans, others yield strings.
 */
export function parseArgs(defaults, argv = process.argv.slice(2)) {
    const parse = (index, acc) => {
        if (index >= argv.length)
            return acc;
        const key = argv[index];
        if (!key.startsWith("--"))
            return parse(index + 1, acc);
        const next = argv[index + 1];
        const hasValue = typeof next === "string" && !next.startsWith("--");
        const def = defaults[key];
        const value = typeof def === "boolean"
            ? hasValue
                ? next === "true" || next === "1"
                : true
            : hasValue
                ? next
                : "true";
        const nextIndex = hasValue ? index + 2 : index + 1;
        return parse(nextIndex, { ...acc, [key]: value });
    };
    return parse(0, { ...defaults });
}
//# sourceMappingURL=parse-args.js.map