import type FileType from "enums/FileType";
import type InputType from "enums/InputType";
import type NumberType from "enums/NumberType";

import type IInputBaseProps from "./IInputBaseProps";
import type InputAreas from "./InputAreas";

type IInputProps = IInputBaseProps & {
    /**
     * Тип поля ввода.
     *
     * @default InputType.number
    */
    type?: InputType;
    /**
     * Тип числового значения.
     *
     * _Только при {@link type}=`InputType.number`_
     *
     * @default NumberType.float
    */
    numberType?: NumberType;
    /**
     * __Минимальное__ числовое значение.
     *
     * _Только при {@link type}=`InputType.number`_
     *
     * @default
     * 0 при (numberType === NumberType.integer)
     * 0.1 при (numberType === NumberType.float)
    */
    min?: number;
    /**
     * __Максимальное__ числовое значение.
     *
     * _Только при {@link type}=`InputType.number`_
     *
     * @default Infinity
    */
    max?: number;
    /**
     * __Шаг изменения значения__ с помощью стрелочек.
     *
     * _Только при {@link type}=`InputType.number`_
     *
     * @default
     * 0.1 при (numberType === NumberType.float)
     * 0 при (numberType === NumberType.integer)
    */
    step?: number;
    /**
     * __Тип XML файла__, который будет открываться по нажатию кнопки.
     *
     * _Только при {@link type}=`InputType.file`_
    */
    fileType?: FileType;
    /**
     * __Шаблон цветовых зон__ значений.
     *
     * _Только при {@link type}=`InputType.number`_
    */
    areas?: InputAreas;
}

export default IInputProps;
