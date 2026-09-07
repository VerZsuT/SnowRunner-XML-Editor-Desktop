import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const LISTS_LOCALIZATION = loadLocalization(new Localization({
  processing: new LocalizationStrings()
    .ru('Выполняется')
    .en('Processing')
    .de('Verarbeitung')
    .ch('处理过程'),

  error: new LocalizationStrings()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),

  reset: new LocalizationStrings()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),

  import: new LocalizationStrings()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),

  ok: new LocalizationStrings()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认'),

  cancel: new LocalizationStrings()
    .ru('Отменить')
    .en('Cancel')
    .de('Stornieren')
    .ch('取消'),

  loading: new LocalizationStrings()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载'),

  successExportMessage: new LocalizationStrings()
    .ru('Конфигурация успешно экпортирована')
    .en('Configuration exported successfully')
    .de('Konfiguration erfolgreich exportiert')
    .ch('配置已成功导出'),

  export: new LocalizationStrings()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),

  modsChangeButton: new LocalizationStrings()
    .ru('Изменить')
    .en('Change')
    .de('Ändern')
    .ch('加载'),

  relaunchPrompt: new LocalizationStrings()
    .ru('Для загрузки мода необходима перезагрузка программы. Выполнить перезагрузку?')
    .en('To add the mod, you need to restart the program. Perform a reboot?')
    .de('Um den Mod zu laden, müssen Sie das Programm neu starten. Einen Neustart durchführen?')
    .ch('要添加模组,需要重新启动软件,是否重新启动&?'),

  addFavorite: new LocalizationStrings()
    .ru('Добавить в избранное')
    .en('Add to Favorites')
    .de('Zu Favoriten hinzufügen')
    .ch('添加到收藏夹'),

  removeFavorite: new LocalizationStrings()
    .ru('Удалить из избранного')
    .en('Delete from favorites')
    .de('Aus Favoriten entfernen')
    .ch('从收藏夹中删除'),

  manualMod: new LocalizationStrings()
    .ru('Выбрать .pak')
    .en('Select .pak')
    .de('Wählen .pak')
    .ch('选择.pak'),

  manualModFolder: new LocalizationStrings()
    .ru('Выбрать папку')
    .en('Select folder')
    .de('Ordner auswählen')
    .ch('选择文件夹'),

  modsPopupTitle: new LocalizationStrings()
    .ru('Модификации')
    .en('Modifications')
    .de('Änderungen')
    .ch('修改'),

  search: new LocalizationStrings()
    .ru('ANK MK38')
    .en('ANK MK38')
    .de('ANK MK38')
    .ch('ANK MK38'),

  emptyList: new LocalizationStrings()
    .ru('Список пуст')
    .en('The list is empty')
    .de('Die Liste ist leer')
    .ch('列表为空'),

  foundItems: new LocalizationStrings()
    .ru('Найдено')
    .en('Added')
    .de('Aktualisiert')
    .ch('找到的项目'),

  addedItems: new LocalizationStrings()
    .ru('Добавлено')
    .en('Found')
    .de('Finden')
    .ch('添加的项目'),

  dlcSource: new LocalizationStrings()
    .ru('DLC')
    .en('DLC')
    .de('DLC')
    .ch('DLC'),

  favoritesSource: new LocalizationStrings()
    .ru('Избранные')
    .en('Favorites')
    .de('Auswahl')
    .ch('收藏'),

  editedSource: new LocalizationStrings()
    .ru('Изменённые')
    .en('Edited')
    .de('Verändern')
    .ch('经修改'),

  mainSource: new LocalizationStrings()
    .ru('Базовые')
    .en('Basic')
    .de('Basic')
    .ch('基本'),

  allSource: new LocalizationStrings()
    .ru('Все')
    .en('All')
    .de('Alle')
    .ch('全部'),

  modsSource: new LocalizationStrings()
    .ru('Модификации')
    .en('Modifications')
    .de('Modifications')
    .ch('Modifications'),

  trucksListTitle: new LocalizationStrings()
    .ru('Список авто')
    .en('List of trucks')
    .de('LKW-Liste')
    .ch('货车名单'),

  trailersListTitle: new LocalizationStrings()
    .ru('Список прицепов')
    .en('List of trailers')
    .de('Liste der Anhänger')
    .ch('拖车清单'),

  trailersCategory: new LocalizationStrings()
    .ru('Прицепы')
    .en('Trailers')
    .de('Nutzfahrzeuge')
    .ch('拖车'),

  trucksCategory: new LocalizationStrings()
    .ru('Автомобили')
    .en('Trucks')
    .de('Autos')
    .ch('汽车'),

  allTypes: new LocalizationStrings()
    .ru('Все')
    .en('All')
    .de('Alle')
    .ch('全部'),

  HEAVY_TYPE: new LocalizationStrings()
    .ru('Тяжёлый')
    .en('Heavy')
    .de('Schwer')
    .ch('重'),

  HEAVY_DUTY_TYPE: new LocalizationStrings()
    .ru('Грузовой')
    .en('Heavy duty')
    .de('Fracht')
    .ch('货物'),

  HIGHWAY_TYPE: new LocalizationStrings()
    .ru('Шоссейник')
    .en('Highway')
    .de('Der Autobahnfahrer')
    .ch('公路维修'),

  OFFROAD_TYPE: new LocalizationStrings()
    .ru('Внедорожник')
    .en('Offroad')
    .de('SUV')
    .ch('越野车'),

  SCOUT_TYPE: new LocalizationStrings()
    .ru('Скаут')
    .en('Scout')
    .de('Pfadfinder')
    .ch('童子军')
}))
