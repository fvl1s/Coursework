function memoize(fn) {
  const cache = {};
  return function(...args) {
    if (cache[args]) return cache[args];
    const result = fn(...args);
    cache[args] = result;
    return result;
  };
}
module.exports = { memoize };