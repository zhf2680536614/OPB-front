enum CacheType {
    local,
    session
}

class Cache {
    storage: Storage
    constructor(type: CacheType) {
        this.storage = type === CacheType.local ? localStorage : sessionStorage
    }

    setCache(key: string, value: any) {
        if (value) {
            this.storage.setItem(key, value)
        }
    }

    getCache(key: string) {
        const value = this.storage.getItem(key)
        if (value) {
            return value
        }
    }

    removeCache(key: string) {
        this.storage.removeItem(key)
    }

    clean() {
        this.storage.clear()
    }
}

const loaclCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)

export { loaclCache, sessionCache }