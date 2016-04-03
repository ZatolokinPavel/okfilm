/**
 * Скрипты обработки видео на странице видео-портфолио
 *
 * Created by Павел on 03.04.2016.
 */

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
    var code;
    var youtube = video.querySelectorAll('.youtube');
    for (var i=0; i < youtube.length; i++) {
        code = youtube[i].innerHTML;
        youtube[i].innerHTML = "<button><img src='/images/youtube_play.svg'></button>";
        youtube[i].addEventListener('click', function(el){playYoutube(el,code);});
        youtube[i].style.background = "url('http://img.youtube.com/vi/"+code+"/0.jpg') no-repeat center center";
        youtube[i].style.backgroundSize = "cover";
        youtube[i].style.display = "block";
    }
}

// Отображение блока видео
function showVideoBlock(video) {
    video.style.display = 'block';
}

// Добавление фрейма с ютубом на страницу по нажатию на кнопку "Воспроизвести"
function playYoutube(event, code) {
    var block = event.target;
    var iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/"+code+"?rel=0&amp;showinfo=0&autoplay=1";
    iframe.frameBorder = "0";
    iframe.setAttribute('allowFullScreen', '');
    iframe.style.width = 'inherit';
    iframe.style.height = 'inherit';
    block.innerHTML = "";
    block.appendChild(iframe);
}
