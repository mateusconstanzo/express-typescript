import memoryCache = require('memory-cache');

class Cache {

    public get(key: String) {
        return memoryCache.get(key);
    }

    public put(key: String, value: any, time: number) {
        memoryCache.put(key, value, time * 1000);
    }

    public getOrPut(key: String, time: number, callback: any) {

        let value = this.get(key);

        if (value) {

            return value;

        } else {

            let value = callback();

            this.put(key, value, time);

            return value;

        }

    }

}

export default new Cache();