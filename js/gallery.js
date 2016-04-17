/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */

$(function() {
    var allGallerys = document.getElementsByClassName('gallery');
    for (var i=0; i < allGallerys.length; i++) {
        showGalleryPhotos(allGallerys[i]);
    }
});

function showGalleryPhotos(gallery) {

    console.log(gallery.innerHTML);
}
