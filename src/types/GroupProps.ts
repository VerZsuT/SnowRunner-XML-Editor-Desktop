import type {GroupLabel} from './GroupLabel'

export interface GroupProps {
    /** Параметры подписи группы */
    label?: GroupLabel
    /** Селектор, наследующийся всеми элементы группы */
    provided?: string
    /** Добавлять ли номер текущей итерации к названию группы */
    addCounter?: boolean
    /** Путь к иконке группы */
    iconName?: string
}
