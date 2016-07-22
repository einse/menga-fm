// Добавить строку с именем файла-ссылки в папку с оригиналом
const mngaAddPathToJSON = (container, string) => {
  string += mngaLinkExt;
  let stringjson = JSON.stringify(string);
	console.log('stringjson:', stringjson);
	let entries = JSON.parse(fs.readFileSync(container, 'utf8'));
	console.log('entries:', entries);
	entries.push(string);
	console.log('entries:', entries);
	fs.writeFileSync(container, JSON.stringify(entries));
};

// Просмотр списка ссылок
const mngaCheckJSON = (container) => {
  let entries = JSON.parse(fs.readFileSync(container, 'utf8'));
  if (entries.length === 0) { // Если список ссылок пуст, удалить json-файл
    // mngaDelete(container);
  }
  return entries.length;
};

// Удалить ссылку из списка
const mngaRemoveFromJSON = (linkpath) => {
  console.log('Путь к ссылке:', linkpath);
  let filepath = fs.readFileSync(linkpath, 'utf8');
  console.log('Путь к оригиналу:', filepath);
  let filefolder = mngaGetParent(filepath);
  let filename = mngaGetName(filepath);
  let jsonpath = filefolder + separator + '.links.' + filename + '.json';
  console.log('linkslist:', jsonpath);
  let entries = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
  let newentries = [];
  for (let i = 0; i < entries.length; i++) {
    console.log('entry', i, ':', entries[i]);
    if (linkpath !== entries[i]) {
      newentries.push(entries[i]); // Создать новый массив ссылок без удалённой
    }
  }
  fs.writeFileSync(jsonpath, JSON.stringify(newentries));
  // mngaCheckJSON(jsonpath);
};

// Перезаписать ссылки на файл
// (прочесть json, открыть файлы ссылок из него, записать в них новый путь)
const mngaRewriteLinks = (jsonpath, newPath) => {
  let entries = JSON.parse(fs.readFileSync(jsonpath, 'utf8'));
  for (let i = 0; i < entries.length; i++) {
    let linkpath = entries[i];
    let filepath = fs.readFileSync(linkpath, 'utf8');
    console.log('old path:', filepath);
    console.log('new path:', newPath);
    filepath = newPath;
    fs.writeFileSync(linkpath, filepath);
    console.log(i, 'rewrited');
  }
};
