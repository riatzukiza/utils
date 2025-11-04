export const START_MARK = "<!-- GENERATED-SECTIONS:DO-NOT-EDIT-BELOW -->";
export const END_MARK = "<!-- GENERATED-SECTIONS:DO-NOT-EDIT-ABOVE -->";
export function stripGeneratedSections(body, start = START_MARK, end = END_MARK) {
    const si = body.indexOf(start);
    const ei = body.indexOf(end);
    if (si >= 0 && ei > si)
        return (body.slice(0, si).trimEnd() + "\n").trimEnd();
    return body.trimEnd() + "\n";
}
//# sourceMappingURL=strip-generated-sections.js.map