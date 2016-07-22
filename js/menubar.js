// Доступ к системному меню
let win = gui.Window.get();

// Строка меню
let menubar = new gui.Menu({ type: 'menubar' });

// Меню "Файл"
let sub1 = new gui.Menu();
sub1.append(new gui.MenuItem({
	label: 'Новый файл',
	click: () => {
	  if (activePanel === 'folderviewleft' || activePanel === 'sideleft') {
	    mngaCreate(dirLeft);
	  }
	  if (activePanel === 'folderviewright' || activePanel === 'sideright') {
	    mngaCreate(dirRight);
	  }
	  mngaUpdate(dirLeft, 1);
	  mngaUpdate(dirRight, 2);
	}
}));
menubar.append(new gui.MenuItem({ label: 'Файл', submenu: sub1}));

// Меню "Правка"
let sub2 = new gui.Menu();
sub2.append(new gui.MenuItem({
	label: 'Вырезать',
	click: () => {
	  mngaMenuCut();
}
}));
sub2.append(new gui.MenuItem({
	label: 'Копировать',
	click: () => {
	  mngaMenuCopy();
	}
}));
sub2.append(new gui.MenuItem({
	label: 'Вставить',
	click: () => {
	  mngaMenuPaste();
	}
}));
sub2.append(new gui.MenuItem({ type: 'separator' }));
sub2.append(new gui.MenuItem({
	label: 'Удалить',
	click: () => {
	  mngaMenuDelete();
	}
}));
menubar.append(new gui.MenuItem({ label: 'Правка', submenu: sub2}));

// Меню "Вид"
let sub3 = new gui.Menu();
sub3.append(new gui.MenuItem({
	label: 'Обновить',
	click: () => {
	  mngaUpdate(dirLeft, 1);
	  mngaUpdate(dirRight, 2);
	}
}));
menubar.append(new gui.MenuItem({ label: 'Вид', submenu: sub3}));

// Привязать созданное меню к системному
win.menu = menubar;
