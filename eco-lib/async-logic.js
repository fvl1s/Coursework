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

async function mapAsync(list, task) {
  const results = [];
  for (const item of list) {
    try {
      const res = await task(item);
      results.push(res);
    } catch (err) {
      console.log("task failed");
    }
  }
  return results;
}

module.exports = { asyncMap, mapAsync };