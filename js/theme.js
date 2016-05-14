/**
 * Эффекты для темы
 *
 * Created by Zatolokin Pavel on 22.03.2016.
 */


// Глобальный объект для хранения таймеров из функции setInterval
var timerObj = {};


// Parallax Scrolling Speed.
// Set the scrolling speed of the background parallax image.
// Рекомендуется устанавливать значения 1.5, 3 или 6
var parallax_ratio = 2;

// Встроеный API для запуска любых типов анимации в браузере.
var requestAnimationFrame = window.requestAnimationFrame
                         || window.webkitRequestAnimationFrame
                         || window.mozRequestAnimationFrame
                         || window.msRequestAnimationFrame
                         || window.oRequestAnimationFrame
                         || function(callback){setTimeout(callback,1e3/60)};


// Parallax Background Scrolling
(function backgroundParallax() {
    var container = document.getElementById('parallaxBackground');
    (function animloop(){
        var x = window.pageYOffset / parallax_ratio;
        container.style.top =  x+'px';
        requestAnimationFrame(animloop);
    }());
}());


// Главное меню - раскрытие подменю
$(function() {
    var menu = $('#main_menu > li');
    menu.hover(function(){
        // при наведении мыши останавливаем текущую анимацию и разворачиваем подменю
        $("div",this).stop(true,false).slideDown(200);
    }, function(){
        // когда убираем курсор, останавливаем текущую анимацию и сворачиваем подменю
        $("div",this).stop(true,false).slideUp(200);
    });
});


// Фотоплёнка на главной странице. Скрытие случайного кадра.
$(function() {
    for (var i=0; i < photoFilm.length; i++) {
        photoFilm[i].firstElementChild.addEventListener('transitionend', photoFilmTransitionEnd);
    }
    setInterval(function () {
        var showNum = Math.floor(Math.random() * shotsFit); // номер случайного кадра из тех, что видно
        var showEl = $('img', photoFilm[showNum]);          // случайный кадр из тех, что видны
        var showWA = showEl.parent();                       // ссылка, в которую обёрнута картинка
        showWA.width(showEl.width());                       // задаём ширину обёртки равную ширине картинки в ней
        //if (showEl.css('opacity') == 0) {
        //
        //}
        showEl.css('opacity', 0);                           // плавно скрываем картинку, которую видно
    }, 5000)
});

// Фотоплёнка на главной странице. Подстановка нового кадра.
function photoFilmTransitionEnd(ev) {
    if (ev.propertyName == 'opacity' && ev.target.style.opacity == 0) {     // если завершилась анимация прозрачности до нуля
        var showEl = $(ev.target);                          // тот кадр, что скрываем
        var showWA = showEl.parent();                       // ссылка, в которую обёрнута картинка
        // номер случайного кадра из запасных
        var hideNum = Math.floor(Math.random() * (photoFilm.length - shotsFit) + shotsFit);
        var hideEl = $('img', photoFilm[hideNum]);          // случайный кадр из тех, что не попали на страницу
        var hideWA = hideEl.parent();                       // ссылка, в которую обёрнута картинка
        // резко делаем прозрачной картинку, которую будем подставлять
        hideEl.css('transition','none').css('opacity',0).css('transition','');
        showWA.width(hideEl.width());                       // теперь меняем ширину обёртки на новую
        showWA.append(hideEl);                              // переносим новый кадр в видимую область
        hideWA.append(showEl);                              // переносим старый кадр за пределы окна
        setTimeout(function(){ hideEl.css('opacity',1); }, 5);  // в новом потоке показываем новую картинку с анимацией
    }
}


// Слайдшоу на главной странице
$(function(){
    var elements = $('#home_slideshow > li');                              // список всех элементов слайдшоу
    var el = elements.first();
    el.show();
    setInterval(function(){
        el.hide();
        el = el.next().length ? el.next() : elements.first();
        el.show();
    }, 5000);
});

// Анимация элементов в зависимости от прокрутки.
$(function() {
    var reviewsBlock = $('#reviews');
    showReviewsBlock(reviewsBlock);
    $(window).scroll(function(){
        showReviewsBlock(reviewsBlock);
    });
});

// Отображение блока отзывов в зависимости от того,
// находится ли он сейчас в видимой области экрана.
function showReviewsBlock(reviewsBlock) {
    if (reviewsBlock.length > 0) {
        var isSeenReviews = scrolledToTheItem(reviewsBlock);
        reviewsBlock.children(0).css('margin-left', (isSeenReviews ? 0 : '100%'));
        reviewsBlock.children(0).css('opacity', (isSeenReviews ? 1 : 0));
    }
}

// Проверка, что элемент находится над нижней границей
// видимой области экрана хотябы на 2/3 своей высоты.
function scrolledToTheItem(el) {
    var scrollTop = $(window).scrollTop();          // верхняя часть видимой области окна
    var windowHeight = $(window).height();          // высота видимой области окна
    var offset = el.offset();                       // положение верхнего левого угла элемента
    return (offset.top + el.height()*2/3) < (scrollTop + windowHeight); // проверяем что элемент появился над нижней границей видимой области хотябы на 2/3
}
