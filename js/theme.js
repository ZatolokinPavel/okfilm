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
