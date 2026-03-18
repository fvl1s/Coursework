const { getValues, limitTime, memoize } = require("eco-lib");

const getStatus = memoize((val) => {
  if (val > 80) return "DANGER";
  if (val > 50) return "WARNING";
  return "NORMAL";
}, { limit: 5, ttl: 4000 });

async function start() {
  console.log("MyEco: Запуск моніторингу...");
  
  for await (const val of limitTime(15)) {
    const status = getStatus(val);
    console.log(`Отримано: ${val} ppm | Статус: ${status}`);
  }

  console.log("MyEco: Роботу завершено");
}

start();