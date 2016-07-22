// Элемент интерфейса "Закладки"
let bookmarks = $('#bookmarks');

// Добавить закладку
const mngaAddBookmark = (path, name) => {
  let li = $('<div/>')
    .addClass('bookmarkitem')
    .text(name)
    .attr('title', path)
    .attr('data-path', path)
    .attr('data-type', 'directory')
    .appendTo(bookmarks);
};

// Обработчики событий
// 1. Выбрать закладку
const mngaSelectBookmark = (target) => {
  let datatype = target.getAttribute('data-type');
  if (datatype !== null)
  {
    selectedBookmark = target;
    selectedBookmark_path = target.getAttribute('data-path');
    if (activePanel === 'folderviewleft' || activePanel === 'sideleft') {
      prevDirLeft = dirLeft;
      backbuttonleft.setAttribute('style', '-webkit-filter:opacity(1.0)');
      dirLeft = selectedBookmark_path;
    }
    if (activePanel === 'folderviewright' || activePanel === 'sideright') {
      prevDirRight = dirRight;
      backbuttonright.setAttribute('style', '-webkit-filter:opacity(1.0)');
      dirRight = selectedBookmark_path;
    }
    mngaUpdate(dirLeft, 1);
    mngaUpdate(dirRight, 2);
  }
};


// Привязка обработчиков
bookmarks.on('click', (e) => {
  mngaSelectBookmark(e.target);
});

// Создание списка закладок по умолчанию
bookmarks.empty();
mngaAddBookmark(process.cwd(), 'Папка приложения');
mngaAddBookmark(homeDir, 'Домашняя папка');

// Добавление закладок по умолчанию для Windows
if (platform === 'win32') {
  let letters = 'CDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < letters.length; i++) {
    let drivepath = letters[i] + ':\\';
    try {
      let stats = fs.lstatSync(drivepath);
      if (stats.isDirectory()) {
        mngaAddBookmark(drivepath, 'Диск ' + letters[i] + ':');
      }
    } catch (e) {

    }
  }
}
