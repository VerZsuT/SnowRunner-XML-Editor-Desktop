import { useRef } from "react";

const SPECIAL_VALUE: any = "__special_value__";

/** Работает как стандартный `useMemo`, но не забывает значение с течением времени */
export default <V, D extends any[]>(factory: (() => V), deps: D): V => {
    const beforeDeps = useRef<D>(SPECIAL_VALUE);
    const memoized = useRef<V>(SPECIAL_VALUE);

    if (beforeDeps.current === SPECIAL_VALUE)
        beforeDeps.current = deps;

    if (memoized.current === SPECIAL_VALUE)
        memoized.current = factory();

    for (const index in deps) {
        if (deps[index] !== beforeDeps.current[index]) {
            memoized.current = factory();
            beforeDeps.current = deps;
            break;            
        }
    }

    return memoized.current;
};
