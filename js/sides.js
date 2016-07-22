// Элементы панелей
let mngaLeft = $('#folderviewleft');
let mngaRight = $('#folderviewright');
let mngaAddrLeft = document.getElementById('pathfieldleft');
let mngaAddrRight = document.getElementById('pathfieldright');
let statusbar = $('#statusbar');

// Обработчики событий
// 1. Двойной клик
const mngaDoubleClick = (target, dir, sidenum) => {
  if (sidenum === 1) {
    prevDirLeft = dir;
    backbuttonleft.setAttribute('style', '-webkit-filter:opacity(1.0)');
  }
  if (sidenum === 2) {
    prevDirRight = dir;
    backbuttonright.setAttribute('style', '-webkit-filter:opacity(1.0)');
  }
  let path = target.getAttribute('data-path');
  let type = mngaLook(path);
  if (type === 0) { // Открытие каталога
    mngaUpdate(path, sidenum);
  }
  let path2original = target.getAttribute('data-path2original');
  if (type === 1) { // Открытие файла
    // Если файл - ссылка
    console.log('path2original:', path2original);
    if (path2original === '') { // Если файл обычный (содержит данные)
      mngaOpen(path);
    } else { // Если файл - ссылка
      mngaOpen(path2original);
    }
  }
};
// 2. Выделение файла (одинарный клик)
const mngaSelect = (target) => {
  let type = target.getAttribute('data-type');
  console.log('type of selected file:', type);
  activePanel = $(target).parent().attr('id');
  if (type !== null) {
    if (selectedFile !== null) {
      $(selectedFile).removeClass('selected');
    }
    $(target).addClass('selected');
    selectedFile = target;
  } else {
    mngaDeselect();
  }
  mngaHighlight();
};
// 3. Обновление содержимого одной панели
const mngaUpdate = (path, sidenum) => {
  let filesArray = mngaBrowse(path);
  let side;
  let field;
  if (sidenum === 1) {
    side = mngaLeft;
    dirLeft = path;
    field = mngaAddrLeft;
  }
  if (sidenum === 2) {
    side = mngaRight;
    dirRight = path;
    field = mngaAddrRight;
  }
  side.empty();
  $.each(filesArray, function (i) {
    let filename = filesArray[i];
    let title = filename;
    let fullpath = path + separator + filename;
    let path2original = '';
    let ext = mngaGetExt(filename);
    if (ext === mngaLinkExt) {
      path2original = fs.readFileSync(fullpath, 'utf8');
      title = path2original;
      filename = mngaGetName(path2original);
    }
    let li = $('<div/>')
      .addClass('fileitem')
      .text(filename)
      .attr('title', title)
      .attr('data-path', fullpath)
      .attr('data-path2original', path2original)
      .attr('data-type', (mngaLook(fullpath) === 0) ? 'directory' : 'file')
      .appendTo(side);
  });
  field.value = path;
  statusbar.html('');
};
// 4. Снятие выделения
const mngaDeselect = () => {
  if (selectedFile !== null) {
    $(selectedFile).removeClass('selected');
    selectedFile = null;
    msg = '';
    statusbar.html(msg);
  }
};
// 5. Обрамление активной панели
const mngaHighlight = () => {
  if (activePanel === 'folderviewleft' || activePanel === 'sideleft') {
    $('#folderviewright').removeClass('active');
    $('#folderviewleft').addClass('active');
  }
  if (activePanel === 'folderviewright' || activePanel === 'sideright') {
    $('#folderviewleft').removeClass('active');
    $('#folderviewright').addClass('active');
  }
};
// 6. Вырезать файл
const mngaCut = () => {
  let datapath = $(selectedFile).attr('data-path');
  console.log('datapath for cut:', datapath);
  if (datapath !== undefined) {
    forCut = datapath;
    forCut_name = $(selectedFile).html();
    console.log('for cut:', forCut);
  } else {
    alert('Не выбран файл для перемещения!');
  }
  forLink = '';
  forLink_name = '';
  forLink_folder = '';
};
// 7. Перемещение файла
const mngaMoveFile = () => {
  if (forCut !== null && forCut !== '') {
    let destination = (activePanel === 'folderviewleft' || activePanel === 'sideleft') ? dirLeft : dirRight;
    let destFilesList = mngaBrowse(destination);
    destination += separator + forCut_name;
    let replace = false;
    for (let i = 0; i < destFilesList.length; i++) {
      if (destFilesList[i] === forCut_name) {
        replace = confirm('Файл с таким именем уже существует. Заменить его?');
        if (!replace) {
          return;
        }
      }
    }
    fs.renameSync(forCut, destination);
  }
  mngaUpdate(dirLeft, 1);
  mngaUpdate(dirRight, 2);
};
// 8. Удаление файла
const mngaDeletePrepare = () => {
  if (selectedFile !== null) {
    forDelete_path = $(selectedFile).attr('data-path');
    forDelete_name = $(selectedFile).html();
    forDelete_folder = (activePanel === 'folderviewleft' || activePanel === 'sideleft') ? dirLeft : dirRight;
    // Если файл со списком ссылок (json) существует - не удалять оригинал,
    // а переместить его на место первой ссылки из списка
    let jsonname = '.links.' + forDelete_name + '.json';
    let jsonpath = forDelete_folder + separator + jsonname;
    let exists = false;
    try {
      stats = fs.lstatSync(jsonpath);
      if (stats.isFile()) {
        exists = true;
      }
    } catch (e) {
		  exists = false;
		}
    if (exists) {
      if (mngaCheckJSON(jsonpath) > 0) {
        let entries = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
        let newfolder = mngaGetParent(entries[0]);
        let newPath = newfolder + separator + forDelete_name;
        let oldlinkpath = newPath + mngaLinkExt;
        let newjsonpath = newfolder + separator + jsonname;
        // Стереть путь к удаляемой ссылке из файла со списком ссылок
        mngaRemoveFromJSON(oldlinkpath);
        // Переместить файл со ссылками
        console.log('Перемещение файла со списком ссылок');
        fs.renameSync(jsonpath, newjsonpath);
        // Переместить сам файл
        fs.renameSync(forDelete_path, newPath);
        // Перезаписать ссылки на файл
        mngaRewriteLinks(newjsonpath, newPath);
        // Удалить ставшую ненужной ссылку
        mngaDelete(oldlinkpath);
        forDelete_path = '';
        return;
      } else { // Если список ссылок пустой - удалить его
        console.log('Список ссылок пуст');
        // mngaDelete(jsonnamepath);
      }
      return;
    }
    // }
    // Если файла со списком ссылок для данного оригинала нет - проверить,
    // не является ли файл ссылкой. Если да - удалить запись из списка
    // ссылок, который находится в одной папке с файлом-оригиналом.
    try {
      stats = fs.lstatSync(forDelete_path);
      if (stats.isFile()) {
        console.log('mngaGetExt(forDelete_path):', mngaGetExt(forDelete_path));
        if (mngaGetExt(forDelete_path) === mngaLinkExt) {
          mngaRemoveFromJSON(forDelete_path);
        }
      }
    } catch (e) {

    }
    // Удаление
    mngaDelete(forDelete_path);
    mngaUpdate(dirLeft, 1);
    mngaUpdate(dirRight, 2);
    msg = 'Файл удалён.';
    console.log(msg);
    statusbar.html(msg);
  } else {
    console.log('Нет файла для удаления.');
  }
};
// 9. Копировать как ссылку
const mngaNewLink = () => {
  if (selectedFile !== null && selectedFile !== undefined) {
    forLink = $(selectedFile).attr('data-path');
    forLink_name = $(selectedFile).html();
    forLink_folder = (activePanel === 'folderviewleft' || activePanel === 'sideleft') ? dirLeft : dirRight;
  }
  forCut = '';
};
// 10. Вставить ссылку
const mngaPasteLink = () => {
  if (forLink !== '') {
    let destination = (activePanel === 'folderviewleft' || activePanel === 'sideleft') ? dirLeft : dirRight;
    let destFilesList = mngaBrowse(destination);
    destination += separator + forLink_name;
    let replace = false;
    for (let i = 0; i < destFilesList.length; i++) {
      if (destFilesList[i] === forLink_name) {
        replace = confirm('Ссылка с таким именем уже существует. Заменить её?');
        if (!replace) {
          return;
        }
      }
    }
    mngaCreateCustomngaLinkExt(forLink, destination);
		let linklistname = '.links.' + forLink_name + '.json';
    let linklistfolder = forLink_folder;
		let linklistpath = forLink_folder + separator + linklistname;
    try {
      stats = fs.lstatSync(linklistpath);
      if (stats.isFile()) {
        // Не перезаписывать файл, если он есть
      }
    } catch (e) {
      // Создать файл для записи путей к ссылкам
      mngaCreateWithName(linklistfolder, linklistname);
      fs.writeFileSync(linklistpath, JSON.stringify([]));
    }
    mngaAddPathToJSON(linklistpath, destination);
    mngaUpdate(dirLeft, 1);
    mngaUpdate(dirRight, 2);
  }
};

// Привязка обработчиков
let filespanelleft = document.getElementById('folderviewleft');
let filespanelright = document.getElementById('folderviewright');
let sides = document.getElementById('sides');

// - к левой панели
filespanelleft.ondblclick = (e) => {
  mngaDoubleClick(e.target, dirLeft, 1);
};
filespanelleft.onclick = (e) => {
  mngaSelect(e.target);
};
filespanelleft.oncontextmenu = (e) => {
  mngaSelect(e.target);
};

// - к правой панели
filespanelright.ondblclick = (e) => {
  mngaDoubleClick(e.target, dirRight, 2);
};
filespanelright.onclick = (e) => {
  mngaSelect(e.target);
};
filespanelright.oncontextmenu = (e) => {
  mngaSelect(e.target);
};
