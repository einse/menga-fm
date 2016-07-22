// Доступ к контекстному меню
let cmenu0 = new gui.Menu();
let cmenu1 = new gui.Menu();

// Стандартное меню
cmenu0.append(new gui.MenuItem({
  label: 'О программе',
  click: function(){
    alert(`Файловый менеджер Menga.
      Автор: Сергей Арсентьев, студент ЧувГУ ИВТ-41-12.`);
  }
}));

// Элементы контекстного меню для элементов панелей
cmenu1.append(new gui.MenuItem({
  label: 'Вырезать',
  click: function(){
    mngaMenuCut();
  }
}));
cmenu1.append(new gui.MenuItem({
  label: 'Копировать',
  click: function(){
    mngaMenuCopy();
  }
}));
cmenu1.append(new gui.MenuItem({
  label: 'Вставить',
  click: function(){
    mngaMenuPaste();
  }
}));
cmenu1.append(new gui.MenuItem({ type: 'separator' }));
cmenu1.append(new gui.MenuItem({
  label: 'Удалить',
  click: function(){
    mngaMenuDelete();
  }
}));

// Стандартная обработка вызова контекстного меню
document.getElementById('bookmarks').addEventListener('contextmenu', function(e) {
  e.preventDefault();
  cmenu0.popup(e.x, e.y);
  return false;
});
document.body.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  cmenu1.popup(e.x, e.y);
  return false;
});
// document.getElementById('folderviewleft').addEventListener('contextmenu', function(e) {
//   e.preventDefault();
//   cmenu1.popup(e.x, e.y);
//   return false;
// });
// document.getElementById('folderviewleft').addEventListener('contextmenu', function(e) {
//   // e.preventDefault();
//   cmenu1.popup(e.x, e.y);
//   return false;
// }, false);
