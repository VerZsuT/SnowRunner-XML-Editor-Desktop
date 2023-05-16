import { localizeVal } from '#g/texts/renderer'
import { ViewModel, unwrap } from '#r/model-ctrlr'

class WhatsNewModel extends ViewModel {
  @unwrap readonly desc073 = localizeVal({
    RU: [
      'Переписан код программы для возможности её дальнейшего улучшения',
      'Обновлены компоненты программы (в том числе интерфейс)',
      'Обновлены стандартные параметры автомобилей',
      'Добавлены картинки автомобилей в новых DLC',
      'Исправлена работа импорта/сброса',
      'Исправлен баг в выборе страны (группа "Разблокировка")'
    ],
    EN: [
      'The program code has been rewritten for the possibility of its further improvement',
      'Updated program components (including interface)',
      'Updated standard car parameters',
      'Added pictures of cars in new DLC',
      'Fixed import/reset operation',
      'Fixed a bug in the country selection ("Unlock" group)'
    ],
    DE: [
      'Der Programmcode wurde neu geschrieben, um es weiter zu verbessern',
      'Programmkomponenten wurden aktualisiert (einschließlich der Benutzeroberfläche)',
      'Standardeinstellungen für Fahrzeuge wurden aktualisiert',
      'Autobilder in neuen DLC hinzugefügt',
      'Import/Reset wurde behoben',
      'Fehler bei der Länderauswahl behoben (Gruppe "Entsperren")'
    ],
    CH: [
      '程序代码已被重写，以便进一步改进',
      '更新的程序组件（包括接口）',
      '更新的标准汽车参数',
      '在新DLC中添加了汽车图片',
      '固定导入/重置操作',
      '修复了国家选择（"解锁"组）中的错误'
    ]
  }) as unknown as string[]
}

export default WhatsNewModel
