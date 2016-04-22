/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */


// Навешиваем обработчики клика на все фотки всех галерей на странице.
$(function() {
    document.getElementById('lightbox_overlay').addEventListener('click', closeLightBox);
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
    var winWidth  = window.innerWidth;          // ширина видимой области экрана
    var winHeight = window.innerHeight;         // высота видимой области экрана
    var scrollTop = $(window).scrollTop();      // верхняя часть видимой области окна
    var scrollLeft = $(window).scrollLeft();    // левая часть видимой области окна

    var img  = new Image;
    var wrap = document.getElementById('lightbox_wrap');
    var content = document.getElementById('lightbox_content');
    var overlay = document.getElementById('lightbox_overlay');

    img.src = link.href;
    img.alt = link.title;
    img.id  = 'lightbox_img';
    img.onload = function() {
        var imgW = img.naturalWidth;
        var imgH = img.naturalHeight;
        var ratio = img.naturalWidth / img.naturalHeight;
        var H = winHeight * ratio * 0.9 <= winWidth ? winHeight * 0.9 : winWidth * 0.9 / ratio;
        var W = (H - 20) * ratio + 20;
        wrap.style.width  = W + 'px';
        wrap.style.height = H + 'px';
        wrap.style.top = (scrollTop + winHeight*0.05) + 'px';
        wrap.style.left = (scrollLeft + (winWidth - W)/2) + 'px';
        content.appendChild(img);
        overlay.style.display = "block";
        wrap.style.display = "block";
    };

    //link = $(link);
    //var nextLink = link.next('a')[0];
    //var prevLink = link.prev('a')[0];
    //
    //wrap.addEventListener('wheel', function(e){
    //    e = e || window.event;
    //    var delta = e.deltaY || e.detail || e.wheelDelta;
    //    if (delta > 0 && nextLink) { console.log(nextLink); }
    //    else if (prevLink) { console.log(prevLink); }
    //    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    //});
}

//function changePhoto(link) {
//    document.getElementById('lightbox_content').innerHTML = "";
//    showOnePhoto(link);
//}

// Закрытие модального окна с фотографией
function closeLightBox() {
    document.getElementById('lightbox_wrap').style.display = "none";
    document.getElementById('lightbox_overlay').style.display = "none";
    document.getElementById('lightbox_content').innerHTML = "";
}
