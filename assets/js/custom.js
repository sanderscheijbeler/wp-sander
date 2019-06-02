"use strict";

// List filter
$(document).ready(function () {
  var grid = $('.grid');
  var qsRegex; // use value of search field to filter

  var $quicksearch = $('.quicksearch').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    grid.isotope({
      filter: function filter() {
        return qsRegex ? $(this).text().match(qsRegex) : true;
      }
    });
  }, 200)); // filter items on button click

  $('.filter-button-group').on('click', 'button', function () {
    // Remove active class of all buttons.
    $('.filter-button-group button').each(function (index, btn) {
      return btn.classList.remove('active');
    }); // Enable the clicked button.

    $(this).addClass('active'); // Filter list with selected filter.

    var filterValue = $(this).attr('data-filter');
    grid.isotope({
      filter: filterValue
    });
  });
}); // Helper functions

/**
 * Debounce the request, so it won't perform a search on every input.
 * @param fn
 * @param time
 * @returns {Function}
 */

function debounce(fn, time) {
  var timeout;
  return function () {
    var _this = this,
        _arguments = arguments;

    var functionCall = function functionCall() {
      return fn.apply(_this, _arguments);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}
"use strict";

$(document).ready(function () {
  $('.loadmorecontainer').on('click', '#load-older-posts', function (e) {
    e.preventDefault();
    var next_page = $(this).attr('href');
    $(this).remove();
    $('.loadmorecontainer').append($('<div />').load(next_page + ' .loadmorecontainer'));
  });
});
"use strict";

// element variables
var els = {
  header: document.querySelector('header.header__wrapper') // init varibles

};
var didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = els.header.offsetHeight; // get current scroll

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
} // what happens on scroll


function menuOnScroll() {
  var currentScroll = getCurrentScroll();
  if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

  if (currentScroll > lastScrollTop && currentScroll > navbarHeight) {
    els.header.classList.add('header__wrapper--hidden');
  } else {
    if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
      els.header.classList.remove('header__wrapper--hidden');
    }
  }

  lastScrollTop = currentScroll;
} // show menu when mouse hovers menu area


document.body.onmousemove = function (e) {
  var pageY = e.pageY || e.clientY,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop,
      trigger_area = pageY - scrollTop,
      trigger_threshold = navbarHeight;

  if (trigger_area <= trigger_threshold) {
    els.header.classList.remove('header__wrapper--hidden');
  }
}; // set on scroll behavior


window.onscroll = function () {
  didScroll = true;
};

setInterval(function () {
  if (didScroll) {
    menuOnScroll();
    didScroll = false;
  }
}, 250);