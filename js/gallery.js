/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */

$(function() {
    var allGallerys = document.getElementsByClassName('gallery');
    for (var i=0; i < allGallerys.length; i++) {
        var gallery = $(allGallerys[i]);
        gallery.children().click(function(link) {showOnePhoto(link);});
    }
});

function showOnePhoto(link) {

    console.log(link);
    return false;
}
