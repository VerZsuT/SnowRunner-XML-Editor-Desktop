import type NameType from "enums/NameType";

export type GroupLabel = {
    /**
     * Тип названия группы.
     *
     * @default NameType.static
    */
    type?: NameType;
    /**
     * Селектор элемента, у которого будет взято название группы
     *
     * Используется вместе с `nameAttribute`
     *
     * _Только при `nameType`=`NameType.computed` | `NameType.tagName`_
    */
    selector?: string;
    /**
     * Дополнительный селектор названия
     *
     * _Используется если элемент по селектору `nameSelector` не найден_
    */
    extraSelector?: string;
    /**
     * Имя атрибута, который будет взят у элемента названия
     *
     * Используется вместе с `nameSelector` или `resNameSelector`
     *
     * _Только при `nameType`=`NameType.computed`_
    */
    attribute?: string;
    /**
     * Дополнительное имя атрибута
     *
     * Используется если атрибут `nameAttribute` не найден
    */
    extraAttribute?: string;
}

type IGroupProps = {
    /** Параметры подписи группы */
    label?: GroupLabel;
    /** Селектор, наследующийся всеми элементы группы */
    providedSelector?: string;
    /** Добавлять ли номер текущей итерации к названию группы */
    addCounter?: boolean;
    /** Путь к иконке группы */
    iconName?: string;
}

export default IGroupProps;
