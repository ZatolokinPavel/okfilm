/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */


// Навешиваем обработчики клика на все фотки всех галерей на странице.
$(function() {
    var allGallerys = document.getElementsByClassName('gallery');
    for (var i=0; i < allGallerys.length; i++) {
        allGallerys[i].onclick = function(e) {
            var target = e.target;
            if(target.nodeName == 'IMG') {target = target.parentNode;}      // если нажатие пришлось не на ссылку а на вложенную в неё картинку, то получаем ссылку
            // Обрабатываем все клики кроме клика колёсиком мыши.
            // Потому что клик колёсиком должен просто открыть фотку в новой вкладке.
            if (e.which != 2 && e.button != 1 && target.nodeName == 'A') {
                showOnePhoto(target);
                return false;
            }
        }
    }
});


// По клику на фотке открываем её в модальном окне
function showOnePhoto(link) {
    console.log(link);
    document.getElementById('lightbox-wrap').style.display = "block";
    document.getElementById('lightbox-overlay').style.display = "block";
}
