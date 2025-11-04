import { promises as fs } from "fs";
import path from "path";
export async function readText(p) {
    return fs.readFile(p, "utf-8");
}
export async function writeText(p, s) {
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, s, "utf-8");
}
export async function readMaybe(p) {
    try {
        return await fs.readFile(p, "utf-8");
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=files.js.map