const { getValues, limitTime } = require("eco-lib");

const dataStream = getValues();

console.log("MyEco: Запуск моніторингу");

limitTime(dataStream, 5, (val) => {
  console.log(`Отримано: ${val}`);
}).then(() => {
  console.log("MyEco: Роботу завершено");
});
