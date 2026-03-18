function memoize(fn, limit = 5) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    const now = Date.now();
    if (cache.has(key)) {
      const entry = cache.get(key);
      if (now - entry.time < 5) {
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