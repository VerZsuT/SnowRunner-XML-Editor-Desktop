import mainProcess from '../../service/mainProcess.js';
import AutoComplete from './AutoComplete.js';
import EditorConsole from './EditorConsole.js';
import help from './help.js';
import Message from './Message.js';

const temp = {
    fileDOM: null,
    filePath: null
};

AutoComplete.init();
EditorConsole.init();

Message.info("Командная строка v1.0.\n- Введите 'help' для вывода списка команд.\n- Стрелки на клавиатуре для переключения предложенного варианта.\n- TAB для выбора варианта.\n- Сообщения можно скролить.");

EditorConsole.onCmd('exit', window.close);
EditorConsole.onCmd('quit', mainProcess.quit);
EditorConsole.onCmd('reload', mainProcess.reload);
EditorConsole.onCmd('reset', () => mainProcess.resetConfig(false));

EditorConsole.onCmd('devTools', params => {
    const action = params[0];
    if (action === 'enable') {
        mainProcess.enableDevTools();
        Message.log('DevTools были включены для всех последующих окон.');
        return;
    }
    if (action === 'disable') {
        mainProcess.disableDevTools();
        Message.log('DevTools были выключены для всех последующих окон.');
        return;
    }
    Message.warn(`Неправильный параметр '${value}'. Ожидалось [enable | disable].`);
});

EditorConsole.onCmd('version', () => {
    Message.log(`Текущая версия программы: ${config.version}.`);
});

EditorConsole.onCmd('sset', params => {
    const name = params[0];
    let value = params[1];

    if (value === undefined) {
        Message.warn(`Вы не ввели значение, после имени ожидалось [true | false].`);
        return;
    }
    if (!['true', 'false'].includes(value)) {
        Message.warn(`Неверное значение, ожидалось [true | false].`);
        return;
    }
    value = value === 'true' || false;

    if (config.settings[name] !== undefined) {
        config.settings[name] = value;
        Message.log(`${name} = ${value}.`);
    } else {
        Message.warn(`Настройка '${name}' не обнаружена в config.json.`);
    }
});

EditorConsole.onCmd('lang', params => {
    const lang = params[0];

    if (lang === undefined) {
        Message.warn('Вы не ввели идентификатор языка.');
        return;
    }

    if (!['RU', 'EN', 'DE'].includes(lang)) {
        Message.warn(`Неверное идентификатор языка. Ожидалось [RU | EN | DE]`);
    } else {
        config.lang = lang;
        mainProcess.reload();
    }
});

EditorConsole.onCmd('read', () => {
    const path = mainProcess.openXMLDialog()[0];
    const parser = new DOMParser();

    if (!path) {
        Message.warn('Вы не выбрали файл для считывания.');
        return;
    }
    const fileDOM = parser.parseFromString(`<root>${preload.readFile(path)}</root>`, 'text/xml');

    if (fileDOM.querySelector('parsererror')) {
        Message.error(`Ошибка парсинга файла.\n${fileDOM.querySelector('parsererror').innerText}`);
        return;
    }

    Message.log(`Файл '${path}' успешно считан в память.`)
    temp.fileDOM = fileDOM;
    temp.filePath = path;
});

EditorConsole.onCmd('set', params => {
    let selector = preload.replacePars(params[0]);
    const attributeName = params[1];
    const value = preload.replacePars(params[2]);

    if (!selector) {
        Message.warn('Вы не ввели селектор элемента.');
        return;
    }
    if (value === undefined) {
        Message.warn('Вы не ввели значение.');
        return;
    }
    if (!attributeName) {
        Message.warn('Вы не ввели название атрибута.');
        return;
    }
    if (!temp.fileDOM) {
        Message.error('Сначала надо считать файл с помощью команды "read".');
        return;
    }
    if (!preload.exists(temp.filePath)) {
        Message.error(`Искомый файл '${temp.filePath}' не обнаружен.`);
        return;
    }

    const element = temp.fileDOM.querySelector(selector);
    if (!element) {
        Message.error(`Элемент с селектором '${selector}' не обнаружен.`);
        return;
    }
    
    const serializer = new XMLSerializer();
    element.setAttribute(attributeName, value);
    preload.writeFile(temp.filePath, serializer.serializeToString(temp.fileDOM).replace('<root>', '').replace('</root>', ''));

    Message.log(`${attributeName}='${value}'`);
});

EditorConsole.onCmd('backup', params => {
    const action = params[0];

    if (action === undefined) {
        Message.warn('Вы не ввели действие.');
        return;
    }
    if (!['save', 'restore'].includes(action)) {
        Message.warn('Вы ввели неправильное действие. Ожидалось [save, restore]');
        return;
    }

    if (action === 'save') {
        mainProcess.saveBackup();
    } else {
        mainProcess.restoreInitial();
    }

    Message.log('Операция проведена.');
});

EditorConsole.onCmd('addMod', () => {
    const result = preload.getModPak();
    if (!result) {
        Message.error('Не выбран .pak файл модификации.');
        return;
    }

    if (!config.modsList[result.id]) {
        config.modsList.length++;
    }
    config.modsList[result.id] = {
        name: result.name,
        path: result.path
    }
    
    mainProcess.reload();
});

EditorConsole.onCmd('checkUpdate', () => {
    Message.log('Проверка обновления...')
    Message.log('В случае удачи выведется соответствующее окно.')
    mainProcess.checkUpdate(true);
});

EditorConsole.onCmd('delMod', params => {
    const modId = params[0];

    if (modId === undefined) {
        Message.warn('Вы не ввели название модификации.');
        return;
    }
    if (!config.modsList[modId]) {
        Message.error(`Мод '${modId}' не идентифицирован программой.`);
        return;
    }

    delete config.modsList[modId];
    preload.removeDir(preload.join(paths.modsTemp, modId));

    config.modsList.length--;
    Message.log(`Модификация '${modId}' удалена.`);
});

EditorConsole.onCmd('help', params => {
    const cmd = params[0];

    if (cmd) {
        if (!help[cmd] || cmd === 'toString') {
            Message.warn(`Неизвестная команда '${cmd}'.`);
            return;
        }
        Message.log(`Справка по команде '${cmd}'\n${help[cmd]}`);
    } else {
        Message.log(`Список команд:\n${help.toString()}`);
    }
});

EditorConsole.onCmd('archive', params => {
    const action = params[0];

    if (action === undefined) {
        Message.warn('Вы не ввели действие.');
        return;
    }
    if (!['save', 'unpack'].includes(action)) {
        Message.warn('Неправильное действие. Ожидалось [save|unpack].');
        return;
    }

    if (action === 'save') {
        mainProcess.saveToOriginal();
        Message.log('Изменения в файлах initial.pak сохранены.');
    } else {
        mainProcess.unpackFiles();
        Message.log('initial.pak был распакован.');
    }
});

EditorConsole.onCmd('config', params => {
    const action = params[0];

    if (action === undefined) {
        Message.warn('Не введено действие.');
        return;
    }
    if (!['import', 'export'].includes(action)) {
        Message.warn('Введено неправильное действие. Ожидалось [import|export]');
        return;
    }

    if (action === 'import') {
        if (!preload.exists(preload.join(paths.backupFolder, 'config.json'))) {
            Message.warn('Нет файла для импортирования.');
            return;
        }
        mainProcess.importConfig();
        Message.log('Конфиг был успешно импортирован.');
        mainProcess.reload();
    } else {
        mainProcess.exportConfig();
        Message.log('Конфиг был успешно экспортирован.');
    }
})
