// Универсальные обработчики пунктов меню
// 1. Вырезать
const mngaMenuCut = () => {
  mngaCut();
};

// 2. Копировать
const mngaMenuCopy = () => {
  mngaNewLink();
};

// 3. Вставить
const mngaMenuPaste = () => {
  if (forCut === '') {
    mngaPasteLink();
  } else {
    mngaMoveFile();
  }
  mngaUpdate(dirLeft, 1);
  mngaUpdate(dirRight, 2);
};

// 4. Удалить
const mngaMenuDelete = () => {
  if (!confirm('Удалить?')) {
    return;
  }
  mngaDeletePrepare();
  mngaUpdate(dirLeft, 1);
  mngaUpdate(dirRight, 2);
};
