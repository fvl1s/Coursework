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
      if (this.items[i].priority > max.priority) max = this.items[i];
    }
    return max;
  }

  peekLowest() {
    if (this.items.length === 0) return null;
    let min = this.items[0];
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority < min.priority) min = this.items[i];
    }
    return min;
  }

  peekOldest() { return this.items[0] || null; }
  peekNewest() { return this.items[this.items.length - 1] || null; }

  dequeueHighest() {
    if (this.items.length === 0) return null;
    let idx = 0;
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority > this.items[idx].priority) idx = i;
    }
    return this.items.splice(idx, 1)[0];
  }

  dequeueLowest() {
    if (this.items.length === 0) return null;
    let idx = 0;
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority < this.items[idx].priority) idx = i;
    }
    return this.items.splice(idx, 1)[0];
  }

  dequeueOldest() { return this.items.shift() || null; }
  dequeueNewest() { return this.items.pop() || null; }

}
module.exports = { SensorQueue };