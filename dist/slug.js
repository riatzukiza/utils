const isLowerAlphaNumeric = (char) => {
    const code = char.codePointAt(0);
    if (code === undefined) {
        return false;
    }
    const isDigit = code >= 0x30 && code <= 0x39; // 0-9
    const isLower = code >= 0x61 && code <= 0x7a; // a-z
    return isDigit || isLower;
};
const appendSlugChar = (acc, char) => {
    if (isLowerAlphaNumeric(char)) {
        const hyphen = acc.pendingHyphen ? "-" : "";
        return {
            result: `${acc.result}${hyphen}${char}`,
            pendingHyphen: false,
        };
    }
    if (acc.result.length === 0) {
        return acc;
    }
    return {
        result: acc.result,
        pendingHyphen: true,
    };
};
/**
 * Convert an arbitrary string into a lower-case kebab-case slug.
 *
 * Non alphanumeric characters collapse into single hyphens, leading and
 * trailing separators are removed, and digits are preserved. Strings composed
 * entirely of invalid characters return an empty slug.
 */
export function slug(s) {
    const { result } = Array.from(s.trim().toLowerCase()).reduce(appendSlugChar, {
        result: "",
        pendingHyphen: false,
    });
    return result;
}
//# sourceMappingURL=slug.js.map