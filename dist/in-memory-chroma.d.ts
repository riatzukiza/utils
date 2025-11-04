export type InMemoryChromaEntry<Metadata> = {
    readonly embedding: readonly number[];
    readonly metadata: Metadata;
};
export type InMemoryChromaQueryHit<Metadata> = {
    readonly id: string;
    readonly score: number;
    readonly metadata: Metadata;
};
type AddInput<Metadata> = {
    readonly id: string;
    readonly embedding: readonly number[];
    readonly metadata: Metadata;
};
export declare class InMemoryChroma<Metadata = Record<string, unknown>> {
    private readonly vectors;
    private dimension;
    add(idsOrEntries: readonly string[] | ReadonlyArray<AddInput<Metadata>>, embeddings?: ReadonlyArray<readonly number[]>, metadata?: readonly Metadata[]): void;
    queryByEmbedding(queryEmbedding: readonly number[], options?: {
        readonly k?: number;
        readonly filter?: (metadata: Metadata) => boolean;
    }): readonly InMemoryChromaQueryHit<Metadata>[];
    clear(): void;
    get size(): number;
    private normalizeAddArgs;
    private looksLikeEntries;
}
export {};
//# sourceMappingURL=in-memory-chroma.d.ts.map