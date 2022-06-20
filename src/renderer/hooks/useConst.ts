import useVariable from "hooks/useVariable";

/**
 * Значение переменной сохраняется между рендерами
 * @param factory - геттер переменной
 */
function useConst<T>(factory: ()=>T): T;

/**
 * Значение переменной сохраняется между рендерами
 * @param value - значение переменной
 */
function useConst<T>(value: T): T;

function useConst<T>(arg: (()=>T) | T): T {
    return useVariable(<T>arg)[0]();
}

export default useConst;
