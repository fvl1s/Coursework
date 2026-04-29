async function* createSensorStream(sensorName, limit) {
    let count = 0;
    while (count < limit) {
        const value = Math.floor(Math.random() * 100) + 1;
        count++;
        yield {
            name: sensorName,
            val: value,
            time: new Date().toLocaleTimeString()
        };
    }
}

module.exports = { createSensorStream };