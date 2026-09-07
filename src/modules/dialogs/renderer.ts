import { initMain, mainMethod } from '@bridge/renderer'
import type { Dialogs as DialogsMain } from './main'

export * from './enums'
export type * from './types'

/**
 * Вывод системных диалогов.
 * _renderer process_
 */
@initMain()
export class Dialogs {
  /**
   * Открыть окно выбора `.epf` файла.
   *
   * {@link DialogsMain['getEPF']|Перейти к методу}
   */
  @mainMethod()
  getEPF!: DialogsMain['getEPF']

  /**
   * Открыть окно сохранения `.epf` файла.
   *
   * {@link DialogsMain['saveEPF']|Перейти к методу}
   */
  @mainMethod()
  saveEPF!: DialogsMain['saveEPF']

  /**
   * Открыть окно выбора `initial.pak`.
   *
   * {@link DialogsMain['getInitial']|Перейти к методу}
   */
  @mainMethod()
  getInitial!: DialogsMain['getInitial']

  /**
   * Открыть окно выбора папки.
   *
   * {@link DialogsMain['getDir']|Перейти к методу}
   */
  @mainMethod()
  getDir!: DialogsMain['getDir']

  /**
   * Открыть окно выбора папки.
   *
   * {@link DialogsMain['getDirs']|Перейти к методу}
   */
  @mainMethod()
  getDirs!: DialogsMain['getDirs']

  /**
   * Открыть окно выбора папки.
   *
   * {@link DialogsMain['getPaks']|Перейти к методу}
   */
  @mainMethod()
  getPaks!: DialogsMain['getPaks']

  /**
   * Открыть окно выбора `.xml` файла.
   *
   * {@link DialogsMain['getXML']|Перейти к методу}
   */
  @mainMethod()
  getXML!: DialogsMain['getXML']
}
