import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  processing: new BaseLocalization()
    .ru('Выполняется')
    .en('Processing')
    .de('Verarbeitung')
    .ch('处理过程'),

  error: new BaseLocalization()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),

  reset: new BaseLocalization()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),

  import: new BaseLocalization()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),

  ok: new BaseLocalization()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认'),

  cancel: new BaseLocalization()
    .ru('Отменить')
    .en('Cancel')
    .de('Stornieren')
    .ch('取消'),

  loading: new BaseLocalization()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载'),

  successExportMessage: new BaseLocalization()
    .ru('Конфигурация успешно экпортирована')
    .en('Configuration exported successfully')
    .de('Konfiguration erfolgreich exportiert')
    .ch('配置已成功导出'),

  export: new BaseLocalization()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),

  modsChangeButton: new BaseLocalization()
    .ru('Изменить')
    .en('Change')
    .de('Ändern')
    .ch('加载'),

  relaunchPrompt: new BaseLocalization()
    .ru('Для загрузки мода необходима перезагрузка программы. Выполнить перезагрузку?')
    .en('To add the mod, you need to restart the program. Perform a reboot?')
    .de('Um den Mod zu laden, müssen Sie das Programm neu starten. Einen Neustart durchführen?')
    .ch('要添加模组,需要重新启动软件,是否重新启动&?'),

  addFavorite: new BaseLocalization()
    .ru('Добавить в избранное')
    .en('Add to Favorites')
    .de('Zu Favoriten hinzufügen')
    .ch('添加到收藏夹'),

  removeFavorite: new BaseLocalization()
    .ru('Удалить из избранного')
    .en('Delete from favorites')
    .de('Aus Favoriten entfernen')
    .ch('从收藏夹中删除'),

  manualMod: new BaseLocalization()
    .ru('Выбрать .pak')
    .en('Select .pak')
    .de('Wählen .pak')
    .ch('选择.pak'),

  manualModFolder: new BaseLocalization()
    .ru('Выбрать папку')
    .en('Select folder')
    .de('Ordner auswählen')
    .ch('选择文件夹'),

  modsPopupTitle: new BaseLocalization()
    .ru('Модификации')
    .en('Modifications')
    .de('Änderungen')
    .ch('修改'),

  search: new BaseLocalization()
    .ru('ANK MK38')
    .en('ANK MK38')
    .de('ANK MK38')
    .ch('ANK MK38'),

  emptyList: new BaseLocalization()
    .ru('Список пуст')
    .en('The list is empty')
    .de('Die Liste ist leer')
    .ch('列表为空'),

  foundItems: new BaseLocalization()
    .ru('Найдено')
    .en('Added')
    .de('Aktualisiert')
    .ch('找到的项目'),

  addedItems: new BaseLocalization()
    .ru('Добавлено')
    .en('Found')
    .de('Finden')
    .ch('添加的项目'),

  dlcSource: new BaseLocalization()
    .ru('DLC')
    .en('DLC')
    .de('DLC')
    .ch('DLC'),

  favoritesSource: new BaseLocalization()
    .ru('Избранное')
    .en('Favorites')
    .de('Auswahl')
    .ch('收藏'),

  mainSource: new BaseLocalization()
    .ru('Базовые')
    .en('Basic')
    .de('Basic')
    .ch('基本'),

  modsSource: new BaseLocalization()
    .ru('Модификации')
    .en('Modifications')
    .de('Modifications')
    .ch('Modifications'),

  trucksListTitle: new BaseLocalization()
    .ru('Список авто')
    .en('List of trucks')
    .de('LKW-Liste')
    .ch('货车名单'),

  trailersListTitle: new BaseLocalization()
    .ru('Список прицепов')
    .en('List of trailers')
    .de('Liste der Anhänger')
    .ch('拖车清单'),

  trailersCategory: new BaseLocalization()
    .ru('Прицепы')
    .en('Trailers')
    .de('Nutzfahrzeuge')
    .ch('拖车'),
    
  trucksCategory: new BaseLocalization()
    .ru('Автомобили')
    .en('Trucks')
    .de('Autos')
    .ch('汽车'),

  allTypes: new BaseLocalization()
    .ru('Все')
    .en('All')
    .de('Alle')
    .ch('全部'),

  heavyType: new BaseLocalization()
    .ru('Тяжёлый')
    .en('Heavy')
    .de('Schwer')
    .ch('重'),

  heavyDutyType: new BaseLocalization()
    .ru('Грузовой')
    .en('Heavy duty')
    .de('Fracht')
    .ch('货物'),

  highwayType: new BaseLocalization()
    .ru('Шоссейник')
    .en('Highway')
    .de('Der Autobahnfahrer')
    .ch('公路维修'),

  offroadType: new BaseLocalization()
    .ru('Внедорожник')
    .en('Offroad')
    .de('SUV')
    .ch('越野车'),

  scoutType: new BaseLocalization()
    .ru('Скаут')
    .en('Scout')
    .de('Pfadfinder')
    .ch('童子军')
}).loadRenderer()
