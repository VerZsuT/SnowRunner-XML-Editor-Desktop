/** Дефолтные параметры поля ввода. */
type DefaultInputProps = {
    /** Название редактируемого атрибута. */
    attribute: string;

    /** Селектор элемента, у которого редактируем атрибут. */
    selector?: string;

    /** Текст в таблице. */
    text: string;

    /** Описание в таблице. */
    desc?: string;

    /** Можно ли добавить родительский элемент при его отсутствии. */
    canAddTag?: boolean;
}

export default DefaultInputProps;
