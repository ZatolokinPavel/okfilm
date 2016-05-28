/**
 * Скрипты обработки видео на странице видео-портфолио
 *
 * Created by Павел on 03.04.2016.
 */

// Кнопка 'Play' для видео YouTube. Выдрал её прямо из ютубовского фрейма
var youtube_play = "<svg width='100%' viewBox='0 0 68 48' version='1.1' height='100%'>" +
    "<path  class='youtube-play-button-bg' fill-opacity='0.81' fill='#1f1f1e' " +
    "d='m .66,37.62 c 0,0 .66,4.70 2.70,6.77 2.58,2.71 5.98,2.63 7.49,2.91 5.43,.52 23.10," +
    ".68 23.12,.68 .00,-1.3e-5 14.29,-0.02 23.81,-0.71 1.32,-0.15 4.22,-0.17 6.81,-2.89 2.03," +
    "-2.07 2.70,-6.77 2.70,-6.77 0,0 .67,-5.52 .67,-11.04 l 0,-5.17 c 0,-5.52 -0.67,-11.04 -0.67," +
    "-11.04 0,0 -0.66,-4.70 -2.70,-6.77 C 62.03,.86 59.13,.84 57.80,.69 48.28,0 34.00,0 34.00," +
    "0 33.97,0 19.69,0 10.18,.69 8.85,.84 5.95,.86 3.36,3.58 1.32,5.65 .66,10.35 .66,10.35 c 0," +
    "0 -0.55,4.50 -0.66,9.45 l 0,8.36 c .10,4.94 .66,9.45 .66,9.45 z'/>" +
    "<path fill='#fff' d='m 26.96,13.67 18.37,9.62 -18.37,9.55 -0.00,-19.17 z'/>" +
    "<path fill='#ccc' d='M 45.02,23.46 45.32,23.28 26.96,13.67 43.32,24.34 45.02,23.46 z'/>" +
    "</svg>";

// После загрузки страницы запускаем отрисовку постеров
$(function() {
    var videos = document.querySelectorAll('.video');
    for (var i=0; i < videos.length; i++) {
        getPoster(videos[i]);
        showVideoBlock(videos[i]);
    }
});

// Добавление постеров для каждого видео
function getPoster(video) {
    var block, code;
    var youtube = video.querySelectorAll('.youtube');
    for (var i=0; i < youtube.length; i++) {
        block = youtube[i];
        code = block.innerHTML;
        block.innerHTML = "<button>"+youtube_play+"</button>";                          // Добавляем внутрь блока кнопку ютуба
        block.addEventListener('click', playYoutube.bind(null,block,code));
        block.style.background = "url('http://img.youtube.com/vi/"+code+"/0.jpg') no-repeat center center";
        block.style.backgroundSize = "cover";
        block.style.display = "block";
    }
}

// Отображение блока видео
function showVideoBlock(video) {
    video.style.display = 'block';
}


// Добавление фрейма с ютубом на страницу по нажатию на кнопку "Воспроизвести"
function playYoutube(block, code) {
    var iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/"+code+"?rel=0&amp;showinfo=0&autoplay=1";
    iframe.frameBorder = "0";
    iframe.setAttribute('allowFullScreen', '');
    iframe.style.width = 'inherit';                                             // Размеры iframe растянутся до размеров родительского блока
    iframe.style.height = 'inherit';
    block.innerHTML = "";                                                       // Удаляем кнопку ютуба из блока
    block.appendChild(iframe);                                                  // Добавляем iframe ютуба в блок
}
