$(document).ready(() => {
    $('#mycarousel').carousel({ interval: 2000 });
    $('#carouselButton').click(() => {
        if (
            $('#carouselButton')
                .children('span')
                .hasClass('fa-pause')
        ) {
            $('#mycarousel').carousel('pause');
            $('#carouselButton')
                .children('span')
                .removeClass('fa-pause')
                .addClass('fa-play');
        } else {
            $('#mycarousel').carousel('cycle');
            $('#carouselButton')
                .children('span')
                .removeClass('fa-play')
                .addClass('fa-pause');
        }
    });

    $('#loginButton').click(() => {
        $('#loginModal').modal('toggle');
    });
    $('#reserveButton').click(() => {
        $('#reserveModal').modal('toggle');
    });
});
