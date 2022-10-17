import type { IGroupLabel } from './IGroupLabel'

export interface IGroupProps {
  /** Параметры подписи группы */
  label?: IGroupLabel
  /** Селектор, наследующийся всеми элементы группы */
  provided?: string
  /** Добавлять ли номер текущей итерации к названию группы */
  addCounter?: boolean
  /** Путь к иконке группы */
  iconName?: string
}
