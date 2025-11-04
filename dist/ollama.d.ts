export declare const OLLAMA_URL: string;
export declare class OllamaError extends Error {
    readonly status: number;
    constructor(status: number, message: string);
}
export type EmbeddingResponse = {
    embedding: number[];
};
export type BatchEmbeddingResponse = {
    data: {
        embedding: number[];
    }[];
};
export declare function ollamaEmbed(model: string, text: string): Promise<number[]>;
export type GenerateRequest = {
    model: string;
    prompt: string;
    stream: false;
    options: {
        temperature: number;
    };
    format?: object | 'json';
};
export type GenerateResponse = {
    readonly response: unknown;
};
export declare function ollamaJSON(model: string, prompt: string, options?: {
    schema?: object;
    timeout?: number;
}): Promise<unknown>;
//# sourceMappingURL=ollama.d.ts.map