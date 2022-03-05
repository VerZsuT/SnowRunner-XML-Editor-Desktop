import type NameType from '../enums/NameType'

type IGroupClassProps = {
    /** __Название группы__, отображаемое в таблице. */
    name?: string
    /**
     * Тип названия группы.
     * 
     * @default NameType.static
    */
    nameType?: NameType
    /**
     * __Селектор элемента__, у которого будет взято название группы.
     * 
     * Используется вместе с {@link nameAttribute}.
     * 
     * _Только при {@link nameType}=`NameType.computed` | `NameType.tagName`_
    */
    nameSelector?: string
    /**
     * __Дополнительный селектор элемента__ названия.
     * 
     * Используется если элемент по селектору {@link nameSelector} не найден.
    */
    resNameSelector?: string
    /**
     * __Имя атрибута__, который будет взят у элемента названия.
     * 
     * Используется вместе с {@link nameSelector} или {@link resNameSelector}
     * 
     * _Только при {@link nameType}=`NameType.computed`_
    */
    nameAttribute?: string
    /**
     * __Дополнительное имя атрибута.__
     * 
     * Используется если атрибут {@link nameAttribute} не найден.
    */
    resNameAttribute?: string
    /** __Селектор по умолчанию__ у всех элементов группы. */
    defaultSelector?: string
    /** __Добавлять ли номер__ текущей итерации к названию группы. */
    withCounter?: boolean
    icon?: string
}

export default IGroupClassProps
