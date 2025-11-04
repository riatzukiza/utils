import ts from "typescript";
/**
 * Extracts concatenated JSDoc comments from a node, if any.
 */
export function getJsDocText(node) {
    const jsdocs = ts.getJSDocCommentsAndTags(node);
    if (!jsdocs?.length)
        return undefined;
    const texts = jsdocs
        .map((d) => "comment" in d && typeof d.comment === "string" ? d.comment : undefined)
        .filter((c) => Boolean(c));
    return texts.join("\n\n").trim() || undefined;
}
/**
 * Returns the source text for a node from the given source string.
 */
export function getNodeText(src, node) {
    return src.slice(node.getFullStart(), node.getEnd());
}
/**
 * Converts a position in a SourceFile to a 1-based line number.
 */
export function posToLine(sf, pos) {
    const { line } = sf.getLineAndCharacterOfPosition(pos);
    return line + 1;
}
//# sourceMappingURL=ts-ast.js.map