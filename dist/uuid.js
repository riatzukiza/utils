import { randomUUID as nodeRandomUUID } from "node:crypto";
export function randomUUID() {
    return globalThis.crypto?.randomUUID?.() ?? nodeRandomUUID();
}
//# sourceMappingURL=uuid.js.map