import type _MainDialogs from './main'
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
   * {@link _MainDialogs.getEPF|Перейти к методу}
   */
  @mainMethod(File)
  getEPF!: () => File | undefined

  /**
   * Открыть окно сохранения `.epf` файла.  
   * {@link _MainDialogs.saveEPF|Перейти к методу}
   */
  @mainMethod(File)
  saveEPF!: (defaultName: string) => File | undefined

  /**
   * Открыть окно выбора `initial.pak`.  
   * {@link _MainDialogs.getInitial|Перейти к методу}
   */
  @mainMethod(File)
  getInitial!: () => File | undefined

  /**
   * Открыть окно выбора папки.  
   * {@link _MainDialogs.getDir|Перейти к методу}
   */
  @mainMethod(Dir)
  getDir!: () => Dir | undefined

  /**
   * Открыть окно выбора папки.  
   * {@link _MainDialogs.getDirs|Перейти к методу}
   */
  @mainMethod(DirArray)
  getDirs!: () => DirArray

  /**
   * Открыть окно выбора папки.  
   * {@link _MainDialogs.getPaks|Перейти к методу}
   */
  @mainMethod(FileArray)
  getPaks!: () => FileArray

  /**
   * Открыть окно выбора `.xml` файла.  
   * {@link _MainDialogs.getXML|Перейти к методу}
   */
  @mainMethod(File)
  getXML!: () => File | undefined
}

export default new Dialogs()
