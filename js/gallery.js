/**
 * Скрипт галерееи для портфолио
 *
 * Created by Павел on 18.04.2016.
 */



// На все ссылки всех галерей навешиваем обработку события наведения и убирания мыши
var GallerySliderOKFilm = function() {

    // Расширение картинки, над которой сейчас курсор, сжатие всех остальных
    var selectSliderElement = function() {
        var li = $(this).parent();
        console.log(li.parent().width());
        var W = (li.parent().width() / 2 - 345) / 5;
        li.siblings().outerWidth(W+'px');
        li.outerWidth('345px');
    };

    // Восстановление обычного размера картинок
    var deselectSliderElement = function() {
        $(this).parent().parent().children().width('');
    };

    $('.gallery_slider a')
        .mouseover(selectSliderElement)
        .mouseleave(deselectSliderElement);
};
$(GallerySliderOKFilm);





// Показ фотографий в модальном окне на весь экран
var GalleryOKFilm = function() {
    var lightbox,                   // весь блок с модальным окном отображения картинок
        wrap,                       // обёртка, в которой находятся фотография и элементы управления
        content,                    // блок с фотографией
        overlay,                    // подложка, затеняющая остальную часть сайта
        $arrow_l,                   // ссылка на предыдущее фото
        $arrow_r,                   // ссылка на следующее фото
        nextLink = null,            // предыдущее фото
        prevLink = null;            // следующее фото

    var _init = function() {
        var allGallerys = document.getElementsByClassName('gallery');
        if(allGallerys.length > 0) {
            _createModalWindow();
            _addEventListeners();
        }
        for (var i=0; i < allGallerys.length; i++) {
            allGallerys[i].onclick = function(e) {
                var target = e.target;
                if(target.nodeName == 'IMG') {target = target.parentNode;}      // если нажатие пришлось не на ссылку а на вложенную в неё картинку, то получаем ссылку
                // Обрабатываем все клики кроме клика колёсиком мыши.
                // Потому что клик колёсиком должен просто открыть фотку в новой вкладке.
                if (e.which != 2 && e.button != 1 && target.nodeName == 'A') {
                    _showOnePhoto(target);
                    return false;
                }
            }
        }
    };

    // Создание элементов модального окна
    var _createModalWindow = function() {
        lightbox = document.createElement('div');
        lightbox.style.display = 'none';
        document.body.appendChild(lightbox);

        lightbox.innerHTML =
            '<div id="lightbox_overlay"></div>' +
            '<div id="lightbox_wrap">' +
                '<div id="lightbox_content"></div>' +
                '<a id="lightbox_close"></a>' +
                '<a id="lightbox_left"><span class="lightbox_left_ico"></span></a>' +
                '<a id="lightbox_right"><span class="lightbox_right_ico"></span></a>' +
            '</div>';
        wrap    = document.getElementById('lightbox_wrap');
        content = document.getElementById('lightbox_content');
        overlay = document.getElementById('lightbox_overlay');
        $arrow_l = $('#lightbox_left');
        $arrow_r = $('#lightbox_right');
    };

    // Навешиваем обработчики клика на все фотки всех галерей на странице.
    var _addEventListeners = function() {
        var close_btn = document.getElementById('lightbox_close');

            overlay.addEventListener('click', _closeLightBox);          // серая подложка закрывает просмотр
          close_btn.addEventListener('click', _closeLightBox);          // крестик в углу закрывает просмотр
        $arrow_l[0].addEventListener('click', _showPrevPhoto);          // стрелка влево на фото переключает на предыдущую фотку
        $arrow_r[0].addEventListener('click', _showNextPhoto);          // стрелка вправо на фото переключает на следующую фотку
               wrap.addEventListener('wheel', _changePhoto_wheel);      // вращение колёсика мышки на фотографии меняет фотографию
           document.addEventListener('keydown', _changePhoto_keyboard); // смена фотографии клавиатурой
        //swipe(document.getElementById('lightbox_wrap'), {             // смена фотографии и закрытие просмотра по свайпу
        //    left:   function() { showNextPhoto(); },
        //    right:  function() { showPrevPhoto(); },
        //    top:    function() { closeLightBox(); },
        //    bottom: function() { closeLightBox(); }
        //});
    };

    // Открываем фотку в модальном окне
    var _showOnePhoto = function(link) {
        var winWidth  = window.innerWidth;          // ширина видимой области экрана
        var winHeight = window.innerHeight;         // высота видимой области экрана
        var scrollTop = $(window).scrollTop();      // верхняя часть видимой области окна
        var scrollLeft = $(window).scrollLeft();    // левая часть видимой области окна

        var img  = new Image;

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
            lightbox.style.display = "block";
        };

        link = $(link);
        nextLink = link.parent().next('li').children()[0];       // сохраняем следующую за этой фотографию
        prevLink = link.parent().prev('li').children()[0];       // сохраняем предыдущую перед этой фотографию
        // Показать или скрыть стрелки переключения фотографий
        if (nextLink) { $arrow_r.show(); } else { $arrow_r.hide(); }
        if (prevLink) { $arrow_l.show(); } else { $arrow_l.hide(); }
    };

    // Смена фотографии на следующую
    var _showNextPhoto = function() {
        if (nextLink) {
            content.innerHTML = "";
            _showOnePhoto(nextLink);
        }
    };

    // Смена фотографии на предыдущую
    var _showPrevPhoto = function() {
        if (prevLink) {
            content.innerHTML = "";
            _showOnePhoto(prevLink);
        }
    };

    // Смена фотографии с помощью стрелок на клавиатуре
    var _changePhoto_keyboard = function(e) {
        e = e || window.event;
        if (lightbox.style.display == 'block') {
            switch (e.keyCode) {
                case 37: _showPrevPhoto(); e.preventDefault ? e.preventDefault() : (e.returnValue = false); break;
                case 39: _showNextPhoto(); e.preventDefault ? e.preventDefault() : (e.returnValue = false); break;
            }
        }
    };

    // Смена фотографии с помощью колёсика мыши
    var _changePhoto_wheel = function(e) {
        e = e || window.event;
        var delta = e.deltaY || e.detail || e.wheelDelta;   // величина поворота колеса мыши
             if (delta > 0) { _showNextPhoto(); }           // колесо повернули к себе
        else if (delta < 0) { _showPrevPhoto(); }           // колесо повернули от себя
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);    // отменяем стандартную прокрутку
    };

    // Закрытие модального окна с фотографией
    var _closeLightBox = function() {
        nextLink = null;
        prevLink = null;
        lightbox.style.display = "none";
        content.innerHTML = "";
    };

    _init();
};
$(GalleryOKFilm);
