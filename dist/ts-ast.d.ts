import ts from "typescript";
import type { ReadonlyDeep } from "type-fest";
/**
 * Extracts concatenated JSDoc comments from a node, if any.
 */
export declare function getJsDocText(node: ReadonlyDeep<ts.Node>): string | undefined;
/**
 * Returns the source text for a node from the given source string.
 */
export declare function getNodeText(src: string, node: ReadonlyDeep<ts.Node>): string;
/**
 * Converts a position in a SourceFile to a 1-based line number.
 */
export declare function posToLine(sf: ReadonlyDeep<ts.SourceFile>, pos: number): number;
//# sourceMappingURL=ts-ast.d.ts.map