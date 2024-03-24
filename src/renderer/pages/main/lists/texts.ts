import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  processing: new Localization()
    .ru('Выполняется')
    .en('Processing')
    .de('Verarbeitung')
    .ch('处理过程'),
  error: new Localization()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),
  reset: new Localization()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),
  import: new Localization()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),
  ok: new Localization()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认'),
  cancel: new Localization()
    .ru('Отменить')
    .en('Cancel')
    .de('Stornieren')
    .ch('取消'),
  loading: new Localization()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载'),
  successExportMessage: new Localization()
    .ru('Конфигурация успешно экпортирована')
    .en('Configuration exported successfully')
    .de('Konfiguration erfolgreich exportiert')
    .ch('配置已成功导出'),
  export: new Localization()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),
  modsChangeButton: new Localization()
    .ru('Изменить')
    .en('Change')
    .de('Ändern')
    .ch('加载'),
  relaunchPrompt: new Localization()
    .ru('Для загрузки мода необходима перезагрузка программы. Выполнить перезагрузку?')
    .en('To add the mod, you need to restart the program. Perform a reboot?')
    .de('Um den Mod zu laden, müssen Sie das Programm neu starten. Einen Neustart durchführen?')
    .ch('要添加模组,需要重新启动软件,是否重新启动&?'),
  addFavorite: new Localization()
    .ru('Добавить в избранное')
    .en('Add to Favorites')
    .de('Zu Favoriten hinzufügen')
    .ch('添加到收藏夹'),
  removeFavorite: new Localization()
    .ru('Удалить из избранного')
    .en('Delete from favorites')
    .de('Aus Favoriten entfernen')
    .ch('从收藏夹中删除'),
  manualMod: new Localization()
    .ru('Выбрать .pak')
    .en('Select .pak')
    .de('Wählen .pak')
    .ch('选择.pak'),
  manualModFolder: new Localization()
    .ru('Выбрать папку')
    .en('Select folder')
    .de('Ordner auswählen')
    .ch('选择文件夹'),
  modsPopupTitle: new Localization()
    .ru('Модификации')
    .en('Modifications')
    .de('Änderungen')
    .ch('修改'),
  search: new Localization()
    .ru('Поиск')
    .en('Search')
    .de('Suche')
    .ch('搜索'),
  emptyList: new Localization()
    .ru('Список пуст')
    .en('The list is empty')
    .de('Die Liste ist leer')
    .ch('列表为空'),
  foundItems: new Localization()
    .ru('Найдено')
    .en('Added')
    .de('Aktualisiert')
    .ch('找到的项目'),
  addedItems: new Localization()
    .ru('Добавлено')
    .en('Found')
    .de('Finden')
    .ch('添加的项目'),
  dlcListTitle: new Localization()
    .ru('Из DLC')
    .en('From DLC')
    .de('Von DLC')
    .ch('来自于DLC'),
  favoritesListTitle: new Localization()
    .ru('Избранное')
    .en('Favorites')
    .de('Auswahl')
    .ch('收藏'),
  mainListTitle: new Localization()
    .ru('Базовые')
    .en('Basic')
    .de('Basic')
    .ch('基本'),
  modsListTitle: new Localization()
    .ru('Из модов')
    .en('From mods')
    .de('Von Mods')
    .ch('来自于MOD'),
  trucksListTitle: new Localization()
    .ru('Список авто')
    .en('List of trucks')
    .de('LKW-Liste')
    .ch('货车名单'),
  trailersListTitle: new Localization()
    .ru('Список прицепов')
    .en('List of trailers')
    .de('Liste der Anhänger')
    .ch('拖车清单'),
  trailersCategoryTitle: new Localization()
    .ru('Прицепы')
    .en('Trailers')
    .de('Nutzfahrzeuge')
    .ch('拖车'),
  trucksCategoryTitle: new Localization()
    .ru('Автомобили')
    .en('Trucks')
    .de('Autos')
    .ch('汽车')
}).get()
