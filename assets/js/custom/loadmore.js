$(document).ready(function(){

    $('.loadmorecontainer').on('click', '#load-older-posts', function(e) {
        e.preventDefault();
        var next_page = $(this).attr('href');
        $(this).remove();
        $('.loadmorecontainer').append( $('<div />').load(next_page + ' .loadmorecontainer') );
    });﻿

});
