/**
 * Эффекты для темы
 *
 * Created by Zatolokin Pavel on 22.03.2016.
 */


// Глобальный объект для хранения таймеров из функции setInterval
var timerObj = {};


// Встроеный API для запуска любых типов анимации в браузере.
//var requestAnimationFrame = window.requestAnimationFrame
//                         || window.webkitRequestAnimationFrame
//                         || window.mozRequestAnimationFrame
//                         || window.msRequestAnimationFrame
//                         || window.oRequestAnimationFrame
//                         || function(callback){setTimeout(callback,1e3/60)};


// Parallax Background Scrolling
(function backgroundParallax() {
    var container = document.getElementById('parallaxBackground');
    // Parallax Scrolling Speed of the background image.
    // Рекомендуется устанавливать значения 1.5, 3 или 6
    var parallax_ratio = 2;
    window.addEventListener('scroll', function() {          // вешаем на скролл прокрутку фона
        var x = window.pageYOffset / parallax_ratio;
        container.style.top =  x+'px';
    });
}());


// Главное меню - раскрытие мобильного меню
$(function() {
    $('#main_menu > ul').clone().appendTo('#sidebar_menu');
    document.getElementById('mobile_menu_toggle').addEventListener('click',toggleMobileMenu);
    document.getElementById('close_sidebar').addEventListener('click',toggleMobileMenu);
    var swipeFun = { left: function() {toggleMobileMenu();}, right: function(){}, top: function(){}, bottom: function(){} };
    swipe(document.getElementById('sidebar'), swipeFun);
    swipe(document.getElementById('close_sidebar'), swipeFun);
});

function toggleMobileMenu() {
    $('.wrapper').toggleClass('open-sidebar');
}


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


// Функция обработки свайпа на указанном элементе
function swipe(el, swipeResult) {
    var initialPoint;
    var finalPoint;
    el.addEventListener('touchstart', function(event) {
        event.preventDefault();
        event.stopPropagation();
        initialPoint = event.changedTouches[0];
    }, false);
    el.addEventListener('touchend', function(event) {
        event.preventDefault();
        event.stopPropagation();
        finalPoint = event.changedTouches[0];
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX){
                    swipeResult.left(); // СВАЙП ВЛЕВО
                } else {
                    swipeResult.right(); // СВАЙП ВПРАВО
                }
            }
            else {
                if (finalPoint.pageY < initialPoint.pageY){
                    swipeResult.top(); // СВАЙП ВВЕРХ
                } else {
                    swipeResult.bottom(); // СВАЙП ВНИЗ
                }
            }
        }
    }, false);
}
