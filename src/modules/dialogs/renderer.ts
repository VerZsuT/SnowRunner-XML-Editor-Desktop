import { Bridge } from 'emr-bridge/renderer'

import { Dir, File } from '/mods/files/renderer'

import type _MainDialogs from './main'
import type { IPublic } from './public'
import { Keys } from './public'

export * from './enums'
export type * from './types'

/**
 * Вывод системных диалогов  
 * _renderer process_
 */
class Dialogs {
  /** Мост main-rend */
  private readonly Bridge = Bridge.as<IPublic>()

  /**
   * Открыть окно выбора `.epf` файла  
   * {@link _MainDialogs.getEPF|Перейти к методу}
   */
  getEPF(): File | undefined {
    const path = this.Bridge[Keys.getEPF]()
    return path ? new File(path) : undefined
  }

  /**
   * Открыть окно сохранения `.epf` файла  
   * {@link _MainDialogs.saveEPF|Перейти к методу}
   */
  saveEPF(defaultName: string): File | undefined {
    const path = this.Bridge[Keys.saveEPF](defaultName)
    return path ? new File(path) : undefined
  }

  /**
   * Открыть окно выбора `initial.pak`  
   * {@link _MainDialogs.getInitial|Перейти к методу}
   */
  getInitial(): File | undefined {
    const path = this.Bridge[Keys.getInitial]()
    return path ? new File(path) : undefined
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getDir|Перейти к методу}
   */
  getDir(): Dir | undefined {
    const path = this.Bridge[Keys.getDir]()
    return path ? new Dir(path) : undefined
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getDirs|Перейти к методу}
   */
  getDirs(): Dir[] | undefined {
    const paths = this.Bridge[Keys.getDirs]()
    return paths ? paths.map(path => new Dir(path)) : undefined
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getPaks|Перейти к методу}
   */
  getPaks(): File[] | undefined {
    const paths = this.Bridge[Keys.getPaks]()
    return paths ? paths.map(path => new File(path)) : undefined
  }

  /**
   * Открыть окно выбора `.xml` файла  
   * {@link _MainDialogs.getXML|Перейти к методу}
   */
  getXML(): File | undefined {
    const path = this.Bridge[Keys.getXML]()
    return path ? new File(path) : undefined
  }
}

export default new Dialogs()
