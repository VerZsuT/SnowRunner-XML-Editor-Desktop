/** Стандартные значения параметров таблицы */
export interface IDefaults {
  [fileName: string]: {
    [selector: string]: {
      [attribute: string]: string | number
    }
  }
}
