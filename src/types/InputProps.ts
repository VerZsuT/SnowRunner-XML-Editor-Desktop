import type {FileType, InputType, NumberType} from 'enums'

import type {InputAreas} from './InputAreas'
import type {InputBaseProps} from './InputBaseProps'

export type InputProps = InputBaseProps & {
    /**
     * Тип поля ввода.
     *
     * @default InputType.number
    */
    type?: InputType
    /**
     * Тип числового значения.
     *
     * _Только при `type`=`InputType.number`_
     *
     * @default NumberType.float
    */
    numberType?: NumberType
    /**
     * Минимальное числовое значение
     *
     * _Только при `type`=`InputType.number`_
     *
     * @default
     * 0 при (numberType === NumberType.integer)
     * 0.1 при (numberType === NumberType.float)
    */
    min?: number
    /**
     * Максимальное числовое значение
     *
     * _Только при `type`=`InputType.number`_
     *
     * @default Infinity
    */
    max?: number
    /**
     * Шаг изменения значения с помощью стрелочек
     *
     * _Только при `type`=`InputType.number`_
     *
     * @default
     * 0.1 при (numberType === NumberType.float)
     * 0 при (numberType === NumberType.integer)
    */
    step?: number
    /**
     * Тип XML файла, который будет открываться по нажатию кнопки
     *
     * _Только при `type`=`InputType.file`_
    */
    fileType?: FileType
    /**
     * Шаблон цветовых зон значений
     *
     * _Только при `type`=`InputType.number`_
    */
    areas?: InputAreas
}
