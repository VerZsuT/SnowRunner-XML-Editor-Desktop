import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
	checkAdminPrivileges: new BaseLocalization()
		.ru('Проверка прав администратора')
		.en('Checking admin privileges')
		.de('Überprüfen von Administratorrechten')
		.ch('检查管理员权限'),

  checkInitial: new BaseLocalization()
		.ru('Проверка initial.pak')
		.en('Checking initial.pak')
		.de('Überprüfung initial.pak')
		.ch('检查 initial.pak'),

  checkFiles: new BaseLocalization()
		.ru('Проверка наличия файлов')
		.en('Checking files')
		.de('Nach Dateien suchen')
		.ch('检查文件'),

  loadGameTexts: new BaseLocalization()
		.ru('Загрузка игровых текстов')
		.en('Loading game texts')
		.de('Spieltexte werden geladen')
		.ch('加载游戏文本'),

  loadDlc: new BaseLocalization()
		.ru('Загрузка дополнений')
		.en('Loading DLC')
		.de('DLC wird geladen')
		.ch('装载DLC'),

  loadMods: new BaseLocalization()
    .ru('Загрузка модификаций')
		.en('Loading mods')
		.de('Anderungen laden')
		.ch('加载修改'),

  /** Распаковка. */
  unpack: new BaseLocalization()
    .ru('Распаковка')
    .en('Unpacking')
    .de('Auspacken')
    .ch('打开包装')
}).loadMain()
