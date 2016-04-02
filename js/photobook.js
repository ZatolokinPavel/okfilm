/**
 * Скрипт калькулятора стоимости фотокниг.
 */

// Запуск рассчёта после загрузки страницы
(function startCalc() {
    var pb_type = document.getElementById('pbook_type');
    var objSel = document.getElementById('pbook_type');
    for (var key in photobook_params) {
        objSel.options[objSel.options.length] = new Option(photobook_params[key].pb_name, key);
    }
    changeType(pb_type);
    pb_type.addEventListener('change', changeType);
})();

// Смена типа фотокниги, перерисовка всех полей параметров и пересчёт цены
function changeType(pb_type) {
    var type = pb_type.value || this.value;
    var params = photobook_params[type];
    setParams(Object.keys(params.pb_size), 'sizes');
    setParams(params.pb_pages, 'pages');
    setParams(params.pb_matte, 'matte');
    setParams(params.pb_paper, 'paper');
    resultPrice();
}

// Перерисовка одного параметра фотокниги.
// Используется при смене типа фотокниги.
function setParams(params, id) {
    var block = document.getElementById('photobook_' + id);
    var objSel = document.getElementById('pbook_' + id);
    objSel.options.length = 0;              // удаляем из поля все элементы
    if (params == undefined) {
        block.style.display = "none";       // скрываем поле, если такой параметр не указан для данного типа фотокниги
    } else {
        block.style.display = "";           // отображаем поле, если такой параметр нужен для данного типа фотокниги
        for (var i = 0; i < params.length; i++) {
            objSel.options[objSel.options.length] = new Option(params[i], params[i]);
        }
        objSel.addEventListener('change', resultPrice);     // Вешаем лисенер на смену этого параметра
    }
}

// Рассчёт и отрисовка цены фотокниги на основе выбранных параметров
function resultPrice() {
    var type = document.getElementById('pbook_type');
    var sizes = document.getElementById('pbook_sizes');
    var pages = document.getElementById('pbook_pages');
    type = type.value;
    sizes = sizes.value;
    pages = pages.value;
    var price = photobook_params[type].pb_size[sizes] * pages;
    document.getElementById('pbook_result').innerHTML = price.toString();
    document.getElementById('photo_book_format').src = "/images/photo_book_formats/photo_book_" + sizes + ".png";
}
