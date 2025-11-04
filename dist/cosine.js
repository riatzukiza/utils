export function cosine(a, b) {
    const n = Math.min(a.length, b.length);
    const { dot, na, nb } = Array.from({ length: n }).reduce((acc, _, i) => ({
        dot: acc.dot + a[i] * b[i],
        na: acc.na + a[i] * a[i],
        nb: acc.nb + b[i] * b[i],
    }), { dot: 0, na: 0, nb: 0 });
    return na === 0 || nb === 0 ? 0 : dot / (Math.sqrt(na) * Math.sqrt(nb));
}
//# sourceMappingURL=cosine.js.map