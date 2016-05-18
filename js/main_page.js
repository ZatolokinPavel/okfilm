/**
 * Скрипты только для главной страницы сайта
 *
 * Created by Zatolokin Pavel on 18.05.2016.
 */



/**
 * Фотоплёнка вверху главной страницы
 */

var shotsFit = 1, photoFilm;                                    // количество видимых кадров и все кадры плёнки

// Центрирование и запуск анимации
$(function() {

    var photoFilmBlock = document.getElementById('photo_film'); // фотоплёнка
    photoFilm = photoFilmBlock.children;                        // все кадры плёнки
    var winWidth = window.innerWidth;                           // ширина окна браузера
    var photoWidth, filmLength = 0;                             // ширина текущего кадра, ширина всех кадров (длина фотоплёнки)
    for (shotsFit; shotsFit <= photoFilm.length; shotsFit++) {
        photoWidth = photoFilm[shotsFit-1].children[0].children[0].width;
        filmLength = filmLength + photoWidth + 6;               // суммируем ширину кадров плюс рамка
        if(filmLength > winWidth) break;                        // суммируем пока кадры видны в окне
    }
    photoFilmBlock.style.left = ((filmLength - winWidth) / -2) + "px";  // сдвигаем плёнку так, чтобы отображаемые кадры были по центру окна
    photoFilmBlock.style.opacity = 1;                                   // так как на время выравнивания фотоплёнка была скрыта, то отображаем её сейчас

    for (var i=0; i < photoFilm.length; i++) {
        photoFilm[i].addEventListener('animationiteration', photoFilmChange);
        photoFilm[i].addEventListener('animationend', photoFilmEnd);
    }
    setInterval(photoFilmHide, 5000);                           // запуск анимированной смены кадров
});

// Скрытие случайного кадра
function photoFilmHide() {
    var showNum = Math.floor(Math.random() * shotsFit); // номер случайного кадра из тех, что видно
    var showBlock = photoFilm[showNum];                 // блок со случайным кадром из тех, что видны
    showBlock.style.width = $('img',showBlock).width(); // задаём ширину блока равную ширине картинки в нём
    showBlock.classList.add('photo_film_animation');    // плавно меняем картинку
}

// Подстановка нового кадра
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

// Очистка после анимации
function photoFilmEnd(ev) {
    ev.target.classList.remove('photo_film_animation');     // удаляем класс после анимации
}

/**
 * КОНЕЦ - Фотоплёнка вверху главной страницы
 */
