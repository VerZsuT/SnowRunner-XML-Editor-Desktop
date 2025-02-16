import type MainDialogs from './main'
import { Dir, DirArray, File, FileArray } from '/mods/files/renderer'
import { initMain, mainMethod } from '/utils/renderer'

export * from './enums'
export type * from './types'

/**
 * Вывод системных диалогов.  
 * _renderer process_
 */
@initMain()
class Dialogs {
  /**
   * Открыть окно выбора `.epf` файла.
   * 
   * {@link MainDialogs.getEPF|Перейти к методу}
   */
  @mainMethod(File)
  getEPF!: typeof MainDialogs.getEPF

  /**
   * Открыть окно сохранения `.epf` файла.
   * 
   * {@link MainDialogs.saveEPF|Перейти к методу}
   */
  @mainMethod(File)
  saveEPF!: typeof MainDialogs.saveEPF

  /**
   * Открыть окно выбора `initial.pak`.
   * 
   * {@link MainDialogs.getInitial|Перейти к методу}
   */
  @mainMethod(File)
  getInitial!: typeof MainDialogs.getInitial

  /**
   * Открыть окно выбора папки.
   * 
   * {@link MainDialogs.getDir|Перейти к методу}
   */
  @mainMethod(Dir)
  getDir!: typeof MainDialogs.getDir

  /**
   * Открыть окно выбора папки.
   * 
   * {@link MainDialogs.getDirs|Перейти к методу}
   */
  @mainMethod(DirArray)
  getDirs!: typeof MainDialogs.getDirs

  /**
   * Открыть окно выбора папки.
   * 
   * {@link MainDialogs.getPaks|Перейти к методу}
   */
  @mainMethod(FileArray)
  getPaks!: typeof MainDialogs.getPaks

  /**
   * Открыть окно выбора `.xml` файла.
   * 
   * {@link MainDialogs.getXML|Перейти к методу}
   */
  @mainMethod(File)
  getXML!: typeof MainDialogs.getXML
}

/**
 * Вывод системных диалогов.  
 * _renderer process_
 */
export default new Dialogs()
