import { z } from "zod";
export type Registry<T> = {
    readonly get: (provider: string, tenant: string) => Promise<T>;
    readonly list: (provider?: string) => Promise<readonly T[]>;
};
type ProviderLike = {
    readonly provider: string;
    readonly tenant: string;
};
export declare function fileBackedRegistry<T extends ProviderLike>({ configPath, schema, map, }: {
    readonly configPath?: string;
    readonly schema: z.ZodType<{
        providers: ReadonlyArray<unknown>;
    }>;
    readonly map?: (p: unknown) => T;
}): Registry<T>;
export {};
//# sourceMappingURL=fileBackedRegistry.d.ts.map