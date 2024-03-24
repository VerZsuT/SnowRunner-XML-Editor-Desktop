import { BaseLocalization, BaseLocalizationObj } from '/utils/texts/base-localization'

export default new BaseLocalizationObj({
  /** Бэкап сохранён успешно */
  successBackupSave: new BaseLocalization()
    .ru('Бэкап initial.pak успешно сохранён.')
    .en('The initial.pak backup was saved successfully.')
    .de('Die Initiale.pak backup wurde erfolgreich gespeichert.')
    .ch('initial.pak备份已成功保存。'),
  /** `initial.pak` восстановлен успешно */
  successInitialRestore: new BaseLocalization()
    .ru('initial.pak был успешно восстановлен.')
    .en('initial.pak was successfully restored.')
    .de('initial.pak wurde erfolgreich restauriert.')
    .ch('initial.pak已被成功恢复。')
})
