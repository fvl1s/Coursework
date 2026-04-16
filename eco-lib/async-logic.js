function asyncMap(list, task, finalCallback) {
  const result = [];
  let count = 0;

  for (let i = 0; i < list.length; i++) {
    task(list[i], (val) => {
      result[i] = val;
      count++;
      if (count === list.length) {
        finalCallback(result);
      }
    });
  }
}

async function mapAsync(list, task, signal) {
  const results = [];
  for (const item of list) {
    if (signal && signal.aborted) {
      return results;
    }
    try {
      const res = await task(item);
      results.push({ data: res, status: "ok" });
    } catch (err) {
      results.push({ data: null, status: "error" });
    }
  }
  return results;
}

module.exports = { asyncMap, mapAsync };