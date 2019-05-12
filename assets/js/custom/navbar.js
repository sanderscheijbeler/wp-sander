// element variables
var els = {
    header: document.querySelector('header.header__wrapper')
}

// init varibles
var didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = els.header.offsetHeight;

// get current scroll
function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

// what happens on scroll
function menuOnScroll() {
    var currentScroll = getCurrentScroll();

    if (Math.abs(lastScrollTop - currentScroll) <= delta)
        return;

    if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
        els.header.classList.add('header__wrapper--hidden');
    } else {
        if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
            els.header.classList.remove('header__wrapper--hidden');
        }
    }

    lastScrollTop = currentScroll;
}

// show menu when mouse hovers menu area
document.body.onmousemove = function(e) {
    var pageY = e.pageY || e.clientY,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        trigger_area = pageY - scrollTop,
        trigger_threshold = navbarHeight;

    if (trigger_area <= trigger_threshold) {
        els.header.classList.remove('header__wrapper--hidden');
    }
};

// set on scroll behavior
window.onscroll = function() {
    didScroll = true;
};
setInterval(function() {
    if (didScroll) {
        menuOnScroll();
        didScroll = false;
    }
}, 250);