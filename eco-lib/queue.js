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
    if (this.items.length === 0) return null;
    let max = this.items[0];
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority > max.priority) {
        max = this.items[i];
      }
    }
    return max;
  }

  dequeueHighest() {
    if (this.items.length === 0) return null;
    let maxIdx = 0;
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority > this.items[maxIdx].priority) {
        maxIdx = i;
      }
    }
    const result = this.items[maxIdx];
    this.items.splice(maxIdx, 1);
    return result;
  }

}
module.exports = { SensorQueue };