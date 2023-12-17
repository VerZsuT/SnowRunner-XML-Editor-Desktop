import type { IPublic } from './public'
import { Keys } from './public'

import { providePubFunc } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Работа с файлами .epf  
 * _renderer process_
*/
class EPF {
  /**
   * Открыть окно выбора `.epf` файлов.  
   * После выбора объединяет их и сохраняет по выбранному пользователем пути
   */
  join = providePubFunc<IPublic[Keys.join]>(Keys.join)

  /**
   * Вывести содержимое `.epf` файла.  
   * Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате
   */
  see = providePubFunc<IPublic[Keys.see]>(Keys.see)
}

export default new EPF()
