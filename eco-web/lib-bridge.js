window.EcoLib = {
    getValues: function* () {
        while (true) {
            yield Math.floor(Math.random() * 91) + 10;
        }
    },

    limitTime: async function(iterator, seconds, callback) {
        const limit = seconds * 1000;
        const start = Date.now();
        try {
            for await (const val of iterator) {
                if (Date.now() - start > limit) break;
                callback(null, val); 
                await new Promise((res) => setTimeout(res, 500));
            }
        } catch (err) {
            callback(err, null);
        }
    },

    memoize: function(fn, config = {}) {
        const { limit = 5, ttl = 5000 } = config;
        const cache = new Map();
        return function(...args) {
            const key = JSON.stringify(args);
            const now = Date.now();
            if (cache.has(key)) {
                const entry = cache.get(key);
                if (now - entry.time < ttl) return entry.val;
                cache.delete(key);
            }
            const result = fn(...args);
            if (cache.size >= limit) cache.delete(cache.keys().next().value);
            cache.set(key, { val: result, time: now });
            return result;
        };
    },

    SensorQueue: class {
        constructor() {
            this.items = [];
            this.counter = 0;
        }
        enqueue(item, priority) {
            this.counter++;
            this.items.push({ data: item, priority: priority, id: this.counter });
        }
        dequeueHighest() {
            if (this.items.length === 0) return null;
            let idx = 0;
            for (let i = 1; i < this.items.length; i++) {
                if (this.items[i].priority > this.items[idx].priority) idx = i;
            }
            return this.items.splice(idx, 1)[0];
        }
    },

    mapAsync: async function(list, task) {
        const results = [];
        for (const item of list) {
            try {
                const res = await task(item);
                results.push({ data: res, status: "ok" });
            } catch (err) {
                results.push({ data: null, status: "error" });
            }
        }
        return results;
    },

    createSensorStream: async function* (sensorName, limit) {
        let count = 0;
        while (count < limit) {
            await new Promise(r => setTimeout(r, 1000));
            
            if (Math.random() > 0.8) {
                throw new Error("Sensor " + sensorName + " connection failed");
            }

            const value = Math.floor(Math.random() * 100) + 1;
            count++;
            yield { 
                name: sensorName, 
                val: value, 
                time: new Date().toLocaleTimeString() 
            };
        }
    },

    processStream: async function(stream, callback) {
        try {
            for await (const data of stream) {
                callback(null, data);
            }
        } catch (err) {
            callback(err, null);
        }
    }
};