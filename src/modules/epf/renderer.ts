import { initMain, mainMethod } from '@bridge/renderer'
import type { EPF as EPFMain } from './main'

export type * from './types'

/**
 * Работа с файлами .epf.
 * _renderer process_
 */
@initMain()
export class EPF {
  /**
   * Открыть окно выбора `.epf` файлов.
   * После выбора объединяет их и сохраняет по выбранному пользователем пути.
   *
   * {@link EPFMain['join']|Перейти к методу}
   */
  @mainMethod()
  join!: EPFMain['join']

  /**
   * Вывести содержимое `.epf` файла.
   * Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате.
   *
   * {@link EPFMain['see']|Перейти к методу}
   */
  @mainMethod()
  see!: EPFMain['see']
}
