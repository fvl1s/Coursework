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

module.exports = { asyncMap };