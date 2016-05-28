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
    var menu = $('#main_menu li');
    menu.hover(function(){
        // при наведении мыши останавливаем текущую анимацию и разворачиваем подменю
        $("div",this).stop(true,false).slideDown(200);
    }, function(){
        // когда убираем курсор, останавливаем текущую анимацию и сворачиваем подменю
        $("div",this).stop(true,false).slideUp(200);
    });
});




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
//$(function() {
//    var reviewsBlock = $('#reviews');
//    var reviews = reviewsBlock.children();
//    var duration = parseFloat(reviews.css("transition-duration"));      // смотрим продолжительность анимации, заданную через css
//    var delay_step = duration / (reviews.length);                       // шаг разницы между началом анимации двух соседних отзывов
//    var delay_transform, delay_opacity;
//    reviews.each(function(i,e) {
//        delay_transform = - delay_step * i;
//        delay_opacity = (duration - delay_step * (i+1))/2;
//        e.style.transitionDelay = delay_transform + 's, ' + delay_opacity + 's';
//        e.style.zIndex = reviews.length - i;
//    });
//    window.addEventListener('scroll', showReviewsBlock);                // вешаем на скролл проверку, нужно ли показывать отзывы
//    showReviewsBlock();                                                 // и сразу же проверяем, нужно ли показывать отзывы
//});

// Отображение блока отзывов в зависимости от того,
// находится ли он сейчас в видимой области экрана.
//function showReviewsBlock() {
//    var reviewsBlock = $('#reviews');
//    if (reviewsBlock.length > 0) {
//        if (scrolledToTheItem(reviewsBlock) == true) {
//            window.removeEventListener('scroll', showReviewsBlock);     // если один раз показали, то больше можно не реагировать на прокрутку
//            reviewsBlock.children().css('transform', "translateX(0px)");
//            reviewsBlock.children().css('opacity', 1);
//        }
//    }
//}

// Проверка, что элемент находится над нижней границей
// видимой области экрана хотябы на 2/3 своей высоты.
function scrolledToTheItem(el) {
    var scrollTop = $(window).scrollTop();          // верхняя часть видимой области окна
    var windowHeight = $(window).height();          // высота видимой области окна
    var offset = el.offset();                       // положение верхнего левого угла элемента
    return (offset.top + el.height()*2/3) < (scrollTop + windowHeight); // проверяем что элемент появился над нижней границей видимой области хотябы на 2/3
}
