type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #reap(): void {
        const now = Date.now();
        for (const [key, entry] of this.#cache.entries()) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

    add<T>(key: string, val: T): void {
        this.#cache.set(key, { createdAt: Date.now(), val });
    }

    get<T>(key: string): T | null {
        const entry = this.#cache.get(key);
        return entry ? entry.val : null;
    }
}