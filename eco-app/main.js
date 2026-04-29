const { 
    getValues, 
    limitTime, 
    memoize, 
    createSensorStream, 
    processStream 
} = require("eco-lib");

const getStatus = memoize((val) => {
    if (val > 80) return "DANGER";
    if (val > 50) return "WARNING";
    return "NORMAL";
}, { limit: 5, ttl: 4000 });

async function start() {
    console.log("Monitoring started ...");
    
    const vals = getValues();
    await limitTime(vals, 3, (val) => {
        const status = getStatus(val);
        console.log(`Received: ${val} ppm | Status: ${status}`);
    });

    console.log("End of data.");
}

async function testStream() {
    console.log("Monitoring started ...");
    const stream = createSensorStream("CO2", 3);
    
    await processStream(stream, (data) => {
        console.log(`[${data.time}] ${data.name}: ${data.val}`);
    });
    
    console.log("End of data.");
}

async function init() {
    await testStream();
    console.log("-----------------------");
    await start();
}

init();