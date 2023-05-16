/** Дефолтные параметры поля ввода. */
interface IDefaultInputProps {
  /** Название редактируемого атрибута. */
  attribute: string
  /** Селектор элемента, у которого редактируем атрибут. */
  selector?: string
  /** Текст в таблице. */
  label: string
  /** Можно ли добавить родительский элемент при его отсутствии. */
  addMissedTag?: boolean
}

export default IDefaultInputProps
