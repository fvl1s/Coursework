async function* createSensorStream(sensorName, limit) {
    let count = 0;
    while (count < limit) {
        await new Promise(r => setTimeout(r, 1000));
        const value = Math.floor(Math.random() * 100) + 1;
        count++;
        yield {
            name: sensorName,
            val: value,
            time: new Date().toLocaleTimeString()
        };
    }
}

async function processStream(stream, callback) {
    for await (const data of stream) {
        callback(data);
    }
}

module.exports = { createSensorStream, processStream };