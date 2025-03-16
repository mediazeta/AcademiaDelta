
jQuery(document).ready(function( $ ) {

    $("#cwc-button").on('click', function (e) {
        e.stopPropagation();

        $(".cwc-popup").removeClass("cwc-container-hide").addClass("cwc-container-show")
    })

    $(window).on('click', function () {
        $(".cwc-popup").removeClass("cwc-container-show").addClass("cwc-container-hide")
    });

    if ($(window).width() < 700) {
        $(".cwc-container-mobile").removeClass("hide").addClass("show")
        $(".cwc-container").removeClass("show").addClass("hide")
    } else {
        $(".cwc-container").removeClass("hide").addClass("show")
        $(".cwc-container-mobile").removeClass("show").addClass("hide")

    }
});