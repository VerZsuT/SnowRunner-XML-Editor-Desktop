import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const GEARBOX_LOCALIZATION = loadLocalization(new Localization({
  isHighGearExists: new LocalizationStrings()
    .ru('Повышенная')
    .en('High')
    .de('Hoher')
    .ch('高速挡'),

  isHighGearExistsDesc: new LocalizationStrings()
    .ru('Доступна ли повышенная передача')
    .en('Is high gear available')
    .de('Ist eine erhöhte Übertragung verfügbar'),

  isLowerPlusGearExists: new LocalizationStrings()
    .ru('Пониженная+')
    .en('Lower+')
    .de('Unterer+')
    .ch('低速+'),

  isLowerPlusGearExistsDesc: new LocalizationStrings()
    .ru('Доступна ли пониженная+ (первая) передача')
    .en('Is lower+ (first) gear available')
    .de('Ist ein reduzierter+ (erster) Gang verfügbar'),

  isLowerGearExists: new LocalizationStrings()
    .ru('Пониженная')
    .en('Lower')
    .de('Unterer')
    .ch('低速'),

  isLowerGearExistsDesc: new LocalizationStrings()
    .ru('Доступна ли пониженная передача (45% скорости первой передачи)')
    .en('Is lower gear available (45% of the first gear speed)')
    .de('Ist eine reduzierte Übertragung verfügbar (45% der ersten Übertragungsrate)'),

  isManualLowGear: new LocalizationStrings()
    .ru('Точная регулировка')
    .en('Precise adjustment')
    .de('Feineinstellung')
    .ch('微调'),

  isManualLowGearDesc: new LocalizationStrings()
    .ru('Доступна ли точная регулировка')
    .en('Is a manual gear available')
    .de('Ist eine genaue Einstellung verfügbar'),

  isLowerMinusGearExists: new LocalizationStrings()
    .ru('Пониженная-')
    .en('Lower-')
    .de('Unterer-')
    .ch('低速-'),

  isLowerMinusGearExistsDesc: new LocalizationStrings()
    .ru('Доступна ли пониженная- передача (20% скорости первой передачи)')
    .en('Is lower- available (20% of the first gear speed)')
    .de('Ist eine reduzierte Übertragung verfügbar (20% der ersten Übertragungsrate)')
}))
