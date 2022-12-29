/** Тип XML файла, открываемого по нажатию кнопки */
enum FileType {
  /** Файл содержит набор двигателей */
  engines = 'engines',
  /** Файл содержит набор КПП */
  gearboxes = 'gearboxes',
  /** Файл содержит набор подвесок */
  suspensions = 'suspensions',
  /** Файл содержит набор колёс */
  wheels = 'wheels',
  /** Файл содержит набор лебёдок */
  winches = 'winches',
  truck = 'truck'
}

export default FileType
