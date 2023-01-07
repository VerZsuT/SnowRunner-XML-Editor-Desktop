/** Тип шаблона */
enum TemplateType {
  /**  Шаблон будет запускать итерацию по всем элементам, найденным по переданному селектору */
  multiply = 'multiply',
  /** Шаблон будет отрисован только один раз */
  single   = 'single'
}

export default TemplateType
