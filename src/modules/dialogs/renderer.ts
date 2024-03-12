import { Bridge } from 'emr-bridge/renderer'

import { Dir, File } from '/mods/files/renderer'

import type _MainDialogs from './main'
import type { PubType } from './public'
import { PubKeys } from './public'

import { hasItems } from '/utils/renderer'

export * from './enums'
export type * from './types'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

/**
 * Вывод системных диалогов  
 * _renderer process_
 */
class Dialogs {
  /**
   * Открыть окно выбора `.epf` файла  
   * {@link _MainDialogs.getEPF|Перейти к методу}
   */
  getEPF(): File | undefined {
    const path = Main[PubKeys.getEPF]()
    if (path) return new File(path)
  }

  /**
   * Открыть окно сохранения `.epf` файла  
   * {@link _MainDialogs.saveEPF|Перейти к методу}
   */
  saveEPF(defaultName: string): File | undefined {
    const path = Main[PubKeys.saveEPF](defaultName)
    if (path) return new File(path)
  }

  /**
   * Открыть окно выбора `initial.pak`  
   * {@link _MainDialogs.getInitial|Перейти к методу}
   */
  getInitial(): File | undefined {
    const path = Main[PubKeys.getInitial]()
    if (path) return new File(path)
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getDir|Перейти к методу}
   */
  getDir(): Dir | undefined {
    const path = Main[PubKeys.getDir]()
    if (path) return new Dir(path)
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getDirs|Перейти к методу}
   */
  getDirs(): Dir[] | undefined {
    const paths = Main[PubKeys.getDirs]()
    if (paths && hasItems(paths)) return paths.map(path => new Dir(path))
  }

  /**
   * Открыть окно выбора папки  
   * {@link _MainDialogs.getPaks|Перейти к методу}
   */
  getPaks(): File[] | undefined {
    const paths = Main[PubKeys.getPaks]()
    if (paths && hasItems(paths)) return paths.map(path => new File(path))
  }

  /**
   * Открыть окно выбора `.xml` файла  
   * {@link _MainDialogs.getXML|Перейти к методу}
   */
  getXML(): File | undefined {
    const path = Main[PubKeys.getXML]()
    if (path) return new File(path)
  }
}

export default new Dialogs()
