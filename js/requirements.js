// Пользовательский интерфейс
const gui = require('nw.gui');

// Операционная система
const os = require('os');
const platform = process.platform;

// Файловая система
const fs = require('fs');
const path = require('path');

// Параметры панелей
const homeDir = process.env[(platform === 'win32') ? 'USERPROFILE' : 'HOME'];
const programDir = process.cwd();
let dirLeft = homeDir;
let dirRight = programDir;
let prevDirLeft = '';
let prevDirRight = '';
let separator = '/';
let selectedFile = null;
let activePanel = 'folderviewleft';
let mngaLinkExt = '.mngaLinkExt'; // Расширение ссылок
let stats = null;

// Параметры закладок
let selectedBookmark = null;
let selectedBookmark_path = '';

// Переменные для удаления, перемещения и копирования
let forDelete_path = '';
let forDelete_name = '';
let forDelete_folder = '';
let forCut = '';
let forCut_name = '';
let forLink = '';
let forLink_folder = '';
let forLink_name = '';

// Сообщение в статусной строке
let msg = 'Новых событий нет.';
