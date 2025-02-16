import type MainEPF from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Работа с файлами .epf.  
 * _renderer process_
 */
@initMain()
class EPF {
  /**
   * Открыть окно выбора `.epf` файлов.  
   * После выбора объединяет их и сохраняет по выбранному пользователем пути.
   * 
   * {@link MainEPF.join|Перейти к методу}
   */
  @mainMethod()
  join!: typeof MainEPF.join

  /**
   * Вывести содержимое `.epf` файла.  
   * Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате.
   * 
   * {@link MainEPF.see|Перейти к методу}
   */
  @mainMethod()
  see!: typeof MainEPF.see
}

/**
 * Работа с файлами .epf.  
 * _renderer process_
 */
export default new EPF()
