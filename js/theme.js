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
    if (typeof photoFilm !== 'undefined') {
        for (var i=0; i < photoFilm.length; i++) {
            photoFilm[i].addEventListener('animationiteration', photoFilmChange);
            photoFilm[i].addEventListener('animationend', photoFilmEnd);
        }
        setInterval(function () {
            var showNum = Math.floor(Math.random() * shotsFit); // номер случайного кадра из тех, что видно
            var showBlock = photoFilm[showNum];                 // блок со случайным кадром из тех, что видны
            showBlock.style.width = $('img',showBlock).width(); // задаём ширину блока равную ширине картинки в нём
            showBlock.classList.add('photo_film_animation');    // плавно меняем картинку
        }, 5000)
    }
});

// Фотоплёнка на главной странице. Подстановка нового кадра.
function photoFilmChange(ev) {
    ev.target.classList.add('photo_film_paused');   // тормознули анимацию, пока меняем картинку
    // номер случайного кадра из запасных
    var hideNum = Math.floor(Math.random() * (photoFilm.length - shotsFit) + shotsFit);
    var showBlock = $(ev.target);                   // тот блок, что только-что скрыли
    var hideBlock = $(photoFilm[hideNum]);          // блок со случайным кадром из тех, что не попали на страницу
    var showWA = showBlock.children();              // ссылка, в которую обёрнута картинка
    var hideWA = hideBlock.children();              // ссылка, в которую обёрнута картинка
    var hideImg = $('img', hideBlock);              // случайный кадр из тех, что не попали на страницу
    showBlock.width(hideImg.width());               // меняем ширину блока на новую
    showBlock.append(hideWA);                       // теперь переносим новый кадр в видимую область
    hideBlock.append(showWA);                       // и переносим старый кадр за пределы окна
    showBlock.removeClass('photo_film_paused');     // снимаем с паузы анимацию
}

// Фотоплёнка на главной странице. Очистка после анимации
function photoFilmEnd(ev) {
    ev.target.classList.remove('photo_film_animation');     // удаляем класс после анимации
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
    var reviews = reviewsBlock.children();
    var duration = parseFloat(reviews.css("transition-duration"));
    var delay_step = duration / (reviews.length);
    reviews.each(function(i,e) {
        e.style.transitionDelay = - delay_step * i + 's, ' + (duration - delay_step * (i+1))/2 + 's';
        e.style.zIndex = reviews.length - i;
    });
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
        reviewsBlock.children().css('transform', (isSeenReviews ? "translateX(0px)" : "translateX(500%)"));
        reviewsBlock.children().css('opacity', (isSeenReviews ? 1 : 0));
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
