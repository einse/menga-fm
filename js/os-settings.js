// Изменить разделитель в пути каталога с '|' на '\'
// для ОС Windows
if (platform === 'win32') {
  separator = '\\';
  console.log('Разделитель изменён с / на ' + separator);
}
