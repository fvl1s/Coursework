class SensorQueue {
  constructor() {
    this.items = [];
    this.counter = 0;
  }
  enqueue(item, priority) {
    this.counter++;
    this.items.push({ data: item, priority: priority, id: this.counter });
  }

  peekHighest() {
    let max = this.items[0];
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority > max.priority) {
        max = this.items[i];
      }
    }
    return max;
  }
}
module.exports = { SensorQueue };