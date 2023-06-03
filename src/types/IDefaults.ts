/** Стандартные значения параметров таблицы */
export default interface IDefaults {
  [fileName: string]: {
    [selector: string]: {
      [attribute: string]: string
    }
  }
}
