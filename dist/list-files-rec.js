import { promises as fs } from "fs";
import * as path from "path";
const IGNORE_DIRS = new Set([
    "node_modules",
    "dist",
    "build",
    "coverage",
    ".turbo",
    ".next",
]);
/**
 * Recursively list files under `root` matching extensions in `exts`.
 * Hidden files/directories and common build outputs are skipped.
 */
const isHidden = (name) => name.startsWith(".");
const isLockFile = (name) => name.startsWith(".#");
const shouldInclude = (name, extensions) => {
    if (extensions.size === 0)
        return true;
    const ext = path.extname(name).toLowerCase();
    return extensions.has(ext);
};
export async function listFilesRec(root, exts) {
    const out = [];
    async function walk(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (isHidden(entry.name))
                continue;
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (IGNORE_DIRS.has(entry.name))
                    continue;
                await walk(full);
                continue;
            }
            if (isLockFile(entry.name))
                continue;
            if (shouldInclude(entry.name, exts)) {
                out.push(full);
            }
        }
    }
    await walk(root);
    return out;
}
//# sourceMappingURL=list-files-rec.js.map