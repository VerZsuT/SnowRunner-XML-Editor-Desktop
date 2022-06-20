import { useRef } from "react";

/**
 * Значение переменной сохраняется между рендерами
 *
 * Позволяет получать текущее значение переменной вне зависимости от рендера
 * @param factory - геттер переменной
 * @returns [геттер, сеттер]
 */
function useVariable<T>(factory: ()=>T): [()=>T, (val: T)=>void];

/**
 * Значение переменной сохраняется между рендерами
 *
 * Позволяет получать текущее значение переменной вне зависимости от рендера
 * @param initialValue - изначальное значение переменной
 * @returns [геттер, сеттер]
 */
function useVariable<T>(initialValue: T): [()=>T, (val: T)=>void];

function useVariable<T>(arg: (()=>T) | T): [()=>T, (val: T)=>void] {
    const isSet = useRef(false);
    const ref = useRef<T>(null);

    if (isSet.current === false) {
        setInitialValue();
        isSet.current = true;
    }

    function setInitialValue() {
        if (arg instanceof Function)
            ref.current = arg();
        else
            ref.current = arg;
    }

    function setValue(value: T) {
        ref.current = value;
    }

    function getValue() {
        return ref.current;
    }

    return [getValue, setValue];
}

export default useVariable;
