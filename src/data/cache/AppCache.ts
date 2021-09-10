export default class AppCache {

    private cache: any = {};
    private static appCache: AppCache | null;

    constructor() {
        const storageCache = localStorage.getItem("ibtikarCache");
        if (storageCache) {
            this.cache = JSON.parse(storageCache);
        }
    }

    static getInstance() {
        if (!AppCache.appCache) {
            AppCache.appCache = new AppCache();
        }
        return AppCache.appCache;
    }

    has(key: string): boolean {
        return this.cache.hasOwnProperty(key);
    }

    save(key: string, value: any, saveInBrowser = true) {
        this.cache[key] = value;
        if (saveInBrowser) {
            localStorage.setItem("ibtikarCache", JSON.stringify(this.cache));
        }
    }

    get(key: string) {
        return this.cache[key];
    }

    clear() {
        this.cache = {};
        localStorage.clear();
    }
}