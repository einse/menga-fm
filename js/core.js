// Создать новый файл
const mngaCreate = (dir) => {
  fs.writeFile(dir + separator + 'Новый файл.txt', '', function(err) {
    let fileContent;
    if (err) {
      alert('Создать новый файл не удалось.');
    } else {
      fs.readFile('./Новый файл.txt', function(err, fileContent) {
        if (err) {
          ('Ошибка чтения ранее созданного файла.');
        }
      });
    }
  });
};

// Создать новый файл
const mngaCreateWithName = (dir, name) => {
  let newPath = dir + separator + name;
  fs.writeFile(newPath, '', function(err) {
    let fileContent;
    if (err) {
      console.log(err);
      alert('Создать новый файл не удалось.');
    } else {
      fs.readFile(newPath, function(err, fileContent) {
        if (err) {
          ('Ошибка чтения ранее созданного файла.');
        }
      });
    }
  });
};

// Получить список имён файлов, находящихся в dir
const mngaBrowse = (dir) => {
  let fileslist = fs.readdirSync(dir);
  let folders = [];
  let files = [];
  let common = [];
  let i;
  for (i = 0; i < fileslist.length; i++) {
    let path = dir + separator + fileslist[i];
    if (fileslist[i][0] !== '.') { // Не показывать файлы с точкой в начале
      if (mngaLook(path) === 0) {
        folders.push(fileslist[i]);
      } else {
        files.push(fileslist[i]);
      }
    }
  }
  for (i = 0; i < folders.length; i++) {
    common.push(folders[i]);
  }
  for (i = 0; i < files.length; i++) {
    common.push(files[i]);
  }
  return common;
};

// Определить тип файла
const mngaLook = (path) => {
  let statInstance = fs.statSync(path);
  if (statInstance.isDirectory()) {
    return 0; // Если каталог
  }
  if (statInstance.isFile()) {
    return 1; // Если файл
  }
  return -1;
};

// Открыть файл средствами ОС
const mngaOpen = (path) => {
  gui.Shell.openItem(path);
};

// Копировать файл
const mngaCopy = (path1, path2) => {
  fs.createReadStream(path1).pipe(fs.createWriteStream(path2));
};

// Удалить файл
const mngaDelete = (path) => {
  let statInstance = fs.statSync(path);
  if (statInstance.isDirectory()) { // Удаление каталога
    console.log('Удаление каталога недоступно.');
  }
  if (statInstance.isFile()) { // Удаление файла, если нет ссылок на него
    fs.unlinkSync(path);
  }
};

// Создать ссылку
const mngaCreateLink = (path1, path2) => {
  fs.symngaLinkExtSync(path1, path2);
};

// Создать ссылку собственного типа
const mngaCreateCustomngaLinkExt = (path1, path2) => {
  let original = path1;
  let originalname = mngaGetName(original);
  let copy = path2;
  let copyfolder = mngaGetParent(copy);
  mngaCreateWithName(copyfolder, originalname + mngaLinkExt);
  let newlinkfile = copyfolder + separator + originalname + mngaLinkExt;
  fs.writeFileSync(newlinkfile, original);
};

// Существует ли каталог
const mngaDirectoryExists = (path) => {
  let exists = false;
  try {
    let stats = fs.lstatSync(path);
    if (stats.isDirectory()) {
      exists = true;
    }
  } catch (e) {
    exists = false;
  }
  return exists;
};

// Существует ли файл
const mngaFileExists = (path) => {
  let exists = false;
  try {
    let stats = fs.lstatSync(path);
    if (stats.isFile()) {
      exists = true;
    }
  } catch (e) {
    exists = false;
  }
  return exists;
};
