/** Дефолтные параметры поля ввода. */
export default interface IDefaultInputProps {
  /** Название редактируемого атрибута. */
  attribute: string
  /** Селектор элемента, у которого редактируем атрибут. */
  selector?: string
  /** Текст в таблице. */
  label: string
  /** Можно ли добавить родительский элемент при его отсутствии. */
  addMissedTag?: boolean
}
