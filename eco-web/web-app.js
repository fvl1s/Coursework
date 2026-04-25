const dashBtn = document.querySelector('.nav-item:nth-child(1)');
const sensBtn = document.querySelector('.nav-item:nth-child(2)');
const histBtn = document.querySelector('.nav-item:nth-child(3)');

const dashPage = document.getElementById('dash-page');
const sensPage = document.getElementById('sensors-page');
const histPage = document.getElementById('history-page');

function showPage(pageName) {
    dashPage.style.display = 'none';
    sensPage.style.display = 'none';
    histPage.style.display = 'none';

    if (pageName === 'dash') {
        dashPage.style.display = 'block';
    } else if (pageName === 'sens') {
        sensPage.style.display = 'block';
    } else if (pageName === 'hist') {
        histPage.style.display = 'block';
    }
}

dashBtn.onclick = function() { showPage('dash'); };
sensBtn.onclick = function() { showPage('sens'); };
histBtn.onclick = function() { showPage('hist'); };