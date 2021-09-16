const help = {
    help: '- help [<command_name>]\n<command_name> - имя команды.\nПомощь по командам консоли.',
    exit: '- exit\nЗакрытие консоли.',
    quit: '- quit\nЗакрытие программы.',
    version: '- version\nТекущая версия программы.',
    reload: '- reload\nПерезагрузка программы.',
    reset: '- reset\nСброс настроек программы.',
    checkUpdate: '- checkUpdate\nПринудительная проверка обновления (игнорирует настройку "обновления").',
    read: '- read\nОткрывает окно выбора .xml файла.\nСчитывает файл в память для его дальнейшего изменения с помощью команды "set".',
    set: '- set <selector> <attribute> <value>\nНаходит элемент xml файла по селектору и устанавливает значение атрибута.\nВажно! Селектор и значение должны быть БЕЗ ПРОБЕЛОВ.',
    addMod: '- addMod\nОткрывает окно выбора .pak файла модификации и добавляет его в программу.',
    delMod: '- delMod <mod_id>\nУдаляет указанную модификацию из программы.',
    devTools: '- devTools {enable|disable}\nВключает/выключает devTools на всех последующих страницах.',
    sset: '- sset <setting_name> {true|false}\nУстанавливает значение настройки.',
    backup: '- backup {save|restore}\nСохраняет/восстанавливает бэкап initial.pak',
    archive: '- archive {save|unpack}\nСохраняет изменения или распаковывает initial.pak',
    lang: '- lang {RU|EN|DE}\nУстанавливает язык перевода программы.',
    toString: () => {
        const array = [];
        for (const cmdName in help) {
            if (cmdName === 'toString') continue;
            array.push(help[cmdName]);
        }
        return array.join('\n\n');
    }
}
export default help;
