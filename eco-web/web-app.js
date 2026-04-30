const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page-block');

function showPage(pageId, activeBtn) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
        navItems[i].classList.remove('active');
    }
    document.getElementById(pageId).style.display = 'block';
    activeBtn.classList.add('active');
}

navItems[0].onclick = function() { showPage('dash-page', navItems[0]); };
navItems[1].onclick = function() { showPage('sensors-page', navItems[1]); };
navItems[2].onclick = function() { showPage('history-page', navItems[2]); };

const getStatus = EcoLib.memoize(function(val) {
    if (val > 70) return 'Danger';
    if (val > 40) return 'Warning';
    return 'Normal';
});

const alertQueue = new EcoLib.SensorQueue();
const alertsContainer = document.getElementById('alerts-container');
const noAlertsText = document.getElementById('no-alerts');

const updateBtn = document.getElementById('update-btn');
const co2Display = document.getElementById('co2-value');

updateBtn.onclick = async function() {
    updateBtn.innerText = 'Scanning...';
    updateBtn.disabled = true;

    const sensorValues = EcoLib.getValues();
    await EcoLib.limitTime(sensorValues, 2, function(val) {
        co2Display.innerText = val + ' ppm';
    });

    const sensorNames = ['CO2', 'Temperature', 'Humidity'];
    const results = await EcoLib.mapAsync(sensorNames, async function(name) {
        await new Promise(r => setTimeout(r, 400));
        return Math.floor(Math.random() * 100);
    });

    const finalValue = results[0].data;
    const co2Status = getStatus(finalValue);
    
    co2Display.innerText = finalValue + ' ppm';
    const indicator = document.querySelector('.status-indicator');
    indicator.innerText = co2Status;
    
    if (co2Status === 'Danger') {
        indicator.className = 'status-indicator danger';
        alertQueue.enqueue({ msg: 'High CO2: ' + finalValue + ' ppm', time: new Date().toLocaleTimeString() }, 10);
        
        const lastAlert = alertQueue.dequeueHighest();
        if (lastAlert) {
            noAlertsText.style.display = 'none';
            const p = document.createElement('p');
            p.style.color = '#e74c3c';
            p.innerText = '⚠️ [' + lastAlert.data.time + '] ' + lastAlert.data.msg;
            alertsContainer.prepend(p);
        }
    } else if (co2Status === 'Warning') {
        indicator.className = 'status-indicator warning';
    } else {
        indicator.className = 'status-indicator';
    }

    updateBtn.innerText = 'Update Data';
    updateBtn.disabled = false;
};

const historyList = document.querySelector('.history-list');

async function startLiveHistory() {
    const stream = EcoLib.createSensorStream('System-Log', 4);
    await EcoLib.processStream(stream, function(data) {
        const li = document.createElement('li');
        li.innerText = '[' + data.time + '] ' + data.name + ': ' + data.val + ' ppm';
        if (data.val > 75) {
            li.style.color = '#e74c3c';
        }
        historyList.appendChild(li);
    });
}

navItems[2].addEventListener('click', function() {
    startLiveHistory();
}, { once: true });