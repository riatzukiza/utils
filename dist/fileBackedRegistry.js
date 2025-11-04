import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import pMemoize from "p-memoize";
export function fileBackedRegistry({ configPath = path.resolve(process.cwd(), "config/providers.yml"), schema, map = (p) => p, }) {
    const load = pMemoize(async () => {
        const file = fs.readFileSync(configPath, "utf8");
        const raw = YAML.parse(file);
        const parsed = schema.parse(raw);
        return parsed.providers.map(map);
    });
    const get = async (provider, tenant) => {
        const all = await load();
        const found = all.find((p) => p.provider === provider && p.tenant === tenant);
        if (!found)
            throw new Error(`Provider tenant not found: ${provider}/${tenant}`);
        return found;
    };
    const list = async (provider) => {
        const all = await load();
        return provider ? all.filter((p) => p.provider === provider) : all;
    };
    return { get, list };
}
//# sourceMappingURL=fileBackedRegistry.js.map