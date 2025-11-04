import { cosine } from "./cosine.js";
export class InMemoryChroma {
    vectors = new Map();
    dimension;
    add(idsOrEntries, embeddings, metadata) {
        const entries = this.normalizeAddArgs(idsOrEntries, embeddings, metadata);
        for (const entry of entries) {
            const embeddingArray = Array.from(entry.embedding);
            const dim = embeddingArray.length;
            if (this.dimension === undefined) {
                this.dimension = dim;
            }
            else if (dim !== this.dimension) {
                throw new Error(`InMemoryChroma.add received embedding of dimension ${dim}, expected ${this.dimension}`);
            }
            this.vectors.set(entry.id, {
                embedding: embeddingArray,
                metadata: entry.metadata,
            });
        }
    }
    queryByEmbedding(queryEmbedding, options) {
        const k = Math.max(0, options?.k ?? 5);
        const filter = options?.filter;
        if (this.dimension === undefined) {
            throw new Error("InMemoryChroma.queryByEmbedding cannot query an empty index");
        }
        if (queryEmbedding.length !== this.dimension) {
            throw new Error(`InMemoryChroma.queryByEmbedding received embedding of dimension ${queryEmbedding.length}, expected ${this.dimension}`);
        }
        if (k === 0)
            return [];
        const hits = [];
        for (const [id, entry] of this.vectors) {
            if (filter && !filter(entry.metadata))
                continue;
            hits.push({
                id,
                metadata: entry.metadata,
                score: cosine(queryEmbedding, entry.embedding),
            });
        }
        hits.sort((a, b) => b.score - a.score);
        return hits.slice(0, k);
    }
    clear() {
        this.vectors.clear();
        this.dimension = undefined;
    }
    get size() {
        return this.vectors.size;
    }
    normalizeAddArgs(idsOrEntries, embeddings, metadata) {
        if (Array.isArray(idsOrEntries) &&
            this.looksLikeEntries(idsOrEntries, embeddings, metadata)) {
            return idsOrEntries;
        }
        if (!embeddings || !metadata) {
            throw new Error("InMemoryChroma.add requires embeddings and metadata when called with ids");
        }
        const ids = idsOrEntries;
        if (ids.length !== embeddings.length || ids.length !== metadata.length) {
            throw new Error("InMemoryChroma.add requires ids, embeddings, and metadata arrays of equal length");
        }
        return ids.map((id, index) => ({
            id,
            embedding: embeddings[index],
            metadata: metadata[index],
        }));
    }
    looksLikeEntries(value, embeddings, metadata) {
        if (value.length === 0) {
            return !embeddings && !metadata;
        }
        return value.every((entry) => {
            if (typeof entry !== "object" || entry === null) {
                return false;
            }
            const candidate = entry;
            return typeof candidate.id === "string";
        });
    }
}
//# sourceMappingURL=in-memory-chroma.js.map