import { sleep } from './sleep.js';
/**
 * Execute an async operation and retry on failure according to the provided {@link RetryOptions}.
 *
 * The helper always performs at least one attempt. Between retries it optionally waits for a delay
 * (using {@link sleep}) that is either computed via the custom {@link RetryOptions.backoff} or by a
 * simple linear progression based on {@link RetryOptions.delayMs}. Errors that exhaust the configured
 * attempts, or that are filtered out by {@link RetryOptions.shouldRetry}, are rethrown to the caller.
 */
export async function retry(operation, opts = {}) {
    const { attempts = 3, delayMs = 100, backoff, shouldRetry, onRetry } = opts;
    const maxAttempts = Math.max(1, attempts | 0);
    const run = async (n) => {
        try {
            return await operation();
        }
        catch (err) {
            if (n >= maxAttempts || (shouldRetry && !shouldRetry(err, n)))
                throw err;
            const wait = Math.max(0, (backoff ? backoff(n) : delayMs * n) | 0);
            if (onRetry)
                await onRetry(err, n, wait);
            if (wait > 0)
                await sleep(wait);
            return run(n + 1);
        }
    };
    return run(1);
}
//# sourceMappingURL=retry.js.map