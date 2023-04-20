/** Тип XML файла */
enum FileType {
  /** Файл двигателей */
  engines = 'engines',
  /** Файл КПП */
  gearboxes = 'gearboxes',
  /** Файл подвесок */
  suspensions = 'suspensions',
  /** Файл колёс */
  wheels = 'wheels',
  /** Файл лебёдок */
  winches = 'winches',
  /** Осовной файл автомобиля */
  truck = 'truck'
}

export default FileType
