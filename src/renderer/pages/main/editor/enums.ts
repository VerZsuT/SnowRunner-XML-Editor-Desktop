/** Тип XML файла */
export enum FileType {
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

export enum InputType {
  /** Поле ввода текста */
  text = 'text',
  /** Поле ввода числа */
  number = 'number',
  /** Поле ввода с выбором */
  select = 'select',
  /** Поле ввода координат` */
  coordinates = 'coordinates',
  /** Дополнительный файл */
  file = 'file'
}

/** Тип числового значения поля ввода */
export enum NumberType {
  /** Целочисленное числа */
  integer = 'int',
  /** Число с плавающей точкой */
  float = 'float'
}

/** Тип параметра */
export enum ParameterType {
  /** Поле ввода */
  input = 'input',
  /** Группа */
  group = 'group'
}

/** Тип шаблона */
export enum TemplateType {
  /** Множественная отрисовка шаблона */
  multiply = 'multiply',
  /** Одиночная отрисовка шаблона */
  single = 'single'
}
