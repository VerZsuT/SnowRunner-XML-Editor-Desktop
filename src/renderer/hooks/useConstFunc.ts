import { useRef } from "react";

/** Возвращает постоянную ссылку на функцию */
export default <T extends (...props: any[])=>any>(arg: T): T => {
    const ref = useRef<T>(null);

    if (ref.current === null)
        ref.current = arg;

    return ref.current;
};
