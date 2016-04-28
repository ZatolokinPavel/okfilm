/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */


var nextLink, prevLink;


// На все ссылки всех галерей навешиваем обработку события наведения и убирания мыши
$(function() {
    $('.gallery_slider a').mouseover(selectSliderElement).mouseleave(deselectSliderElement);
});

// Расширение картинки, над которой сейчас курсор, сжатие всех остальных
function selectSliderElement() {
    var li = $(this).parent();
    console.log(li.parent().width());
    var W = (li.parent().width() - 300) / 5;
    li.siblings().outerWidth(W+'px');
    li.outerWidth('300px');
}
// Восстановление обычного размера картинок
function deselectSliderElement() {
    $(this).parent().parent().children().width('');
}


// Навешиваем обработчики клика на все фотки всех галерей на странице.
$(function() {
    document.getElementById('lightbox_overlay').addEventListener('click', closeLightBox);   // серая подложка закрывает просмотр
    document.getElementById('lightbox_close').addEventListener('click', closeLightBox);     // крестик в углу закрывает просмотр
    document.getElementById('lightbox_left').addEventListener('click', showPrevPhoto);      // стрелка влево на фото переключает на предыдущую фотку
    document.getElementById('lightbox_right').addEventListener('click', showNextPhoto);     // стрелка вправо на фото переключает на следующую фотку
    document.getElementById('lightbox_wrap').addEventListener('wheel', changePhoto_wheel);  // вращение колёсика мышки на фотографии меняет фотографию
    document.addEventListener('keydown', changePhoto_keyboard);                             // смена фотографии клавиатурой

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

    link = $(link);
    nextLink = link.next('a')[0];       // сохраняем в глобальную переменную следующую за этой фотографию
    prevLink = link.prev('a')[0];       // сохраняем в глобальную переменную предыдущую перед этой фотографию
    // Показать или скрыть стрелки переключения фотографий
    if (nextLink) { $('#lightbox_right').show(); } else { $('#lightbox_right').hide(); }
    if (prevLink) { $('#lightbox_left').show();  } else { $('#lightbox_left').hide(); }
}
// Смена фотографии на следующую
function showNextPhoto() {
    if (nextLink) {
        document.getElementById('lightbox_content').innerHTML = "";
        showOnePhoto(nextLink);
    }
}
// Смена фотографии на предыдущую
function showPrevPhoto() {
    if (prevLink) {
        document.getElementById('lightbox_content').innerHTML = "";
        showOnePhoto(prevLink);
    }
}

// Смена фотографии с помощью стрелок на клавиатуре
function changePhoto_keyboard(e) {
    e = e || window.event;
    var lightBox = document.getElementById('lightbox_wrap');
    if (lightBox.style.display == 'block') {
        switch (e.keyCode) {
            case 37: showPrevPhoto(); e.preventDefault ? e.preventDefault() : (e.returnValue = false); break;
            case 39: showNextPhoto(); e.preventDefault ? e.preventDefault() : (e.returnValue = false); break;
        }
    }
}

// Смена фотографии с помощью колёсика мыши
function changePhoto_wheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;   // величина поворота колеса мыши
    if (delta > 0) { showNextPhoto(); }                 // колесо повернули к себе
    else if (delta < 0) { showPrevPhoto(); }            // колесо повернули от себя
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);    // отменяем стандартную прокрутку
}

// Закрытие модального окна с фотографией
function closeLightBox() {
    nextLink = undefined;
    prevLink = undefined;
    document.getElementById('lightbox_wrap').style.display = "none";
    document.getElementById('lightbox_overlay').style.display = "none";
    document.getElementById('lightbox_content').innerHTML = "";
}
