/** Стандартные значения параметров таблицы */
interface IDefaults {
  [fileName: string]: {
    [selector: string]: {
      [attribute: string]: string
    }
  }
}

export default IDefaults
