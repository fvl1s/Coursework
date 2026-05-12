async function limitTime(iterator, seconds, callback) {
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
}

module.exports = { limitTime };