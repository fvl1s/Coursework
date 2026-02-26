async function limitTime(iterator, seconds, callback) {
  const limit = seconds * 1000;
  const start = Date.now();

  for (const val of iterator) {
    if (Date.now() - start > limit) break;
    callback(val);
    await new Promise((res) => setTimeout(res, 500));
  }
}

module.exports = { limitTime };
