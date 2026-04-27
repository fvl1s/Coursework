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