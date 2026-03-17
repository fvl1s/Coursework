function memoize(fn, limit = 5) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const val = cache.get(key);
      cache.delete(key);
      cache.set(key, val);
      return val;
    }
    
    if (cache.size >= limit) cache.delete(cache.keys().next().value);
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

module.exports = { memoize };