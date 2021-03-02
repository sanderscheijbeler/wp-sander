
// List filter
$(document).ready(() => {
    const grid = $('.grid')
    let qsRegex

    // use value of search field to filter
    var $quicksearch = $('.QuickSearch').keyup(
        debounce(() => {
                qsRegex = new RegExp($quicksearch.val(), 'gi');

                grid.isotope({
                    filter() {
                        return qsRegex ? $(this).text().match(qsRegex) : true;
                    }
                });
            },
            200)
    );

    // filter items on button click
    $('.filter-button-group').on('click', 'button', function () {
        // Remove active class of all buttons.
        $('.filter-button-group button').each((index, btn) => btn.classList.remove('active'));

        // Enable the clicked button.
        $(this).addClass('active');

        // Filter list with selected filter.
        var filterValue = $(this).attr('data-filter');
        grid.isotope({filter: filterValue});
    });
});

// Helper functions

/**
 * Debounce the request, so it won't perform a search on every input.
 * @param fn
 * @param time
 * @returns {Function}
 */
function debounce(fn, time) {
    let timeout;

    return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    }
}
