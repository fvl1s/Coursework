function memoize(fn, config = {}) {
  const { limit = 5, ttl = 5000 } = config;
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    const now = Date.now();
    if (cache.has(key)) {
      const entry = cache.get(key);
      if (now - entry.time < ttl) {
        cache.delete(key);
        cache.set(key, entry);
        return entry.val;
      }
      cache.delete(key);
    }
    const result = fn(...args);
    if (cache.size >= limit) cache.delete(cache.keys().next().value);
    cache.set(key, { val: result, time: now });
    return result;
  };
}
module.exports = { memoize };