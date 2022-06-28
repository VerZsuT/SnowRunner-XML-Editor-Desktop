import type IInputBaseProps from "types/IInputBaseProps";

/** Возвращает ID селектора после `SELECTOR_ID` */
export function getSelectorID(selector: string): string | null {
    if (!selector)
        return null;
    return selector.split("||")[0].split("SELECTOR_ID:")[1];
}

/** Возвращает базовые свойства поля ввода */
export function getInputBaseProps(props: IInputBaseProps) {
    return {
        attribute: props.attribute,
        label: props.label,
        addMissedTag: props.addMissedTag,
        selector: getSelectorID(props.selector)
    };
}
