function memoize(fn, limit = 5) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    if (cache.size >= limit) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

module.exports = { memoize };