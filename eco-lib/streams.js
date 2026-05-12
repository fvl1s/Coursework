async function* createSensorStream(sensorName, limit) {
    let count = 0;
    while (count < limit) {
        await new Promise(r => setTimeout(r, 1000));
        if (Math.random() > 0.85) {
            throw new Error("Sensor " + sensorName + " connection failed");
        }

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
    try {
        for await (const data of stream) {
            callback(null, data);
        }
    } catch (err) {
        callback(err, null);
    }
}

module.exports = { createSensorStream, processStream };