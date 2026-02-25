function* getValues() {
  while (true) {
    yield Math.floor(Math.random() * 91) + 10;
  }
}

module.exports = { getValues };
