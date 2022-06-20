/* eslint-disable react-hooks/exhaustive-deps */

import { useLayoutEffect } from "react";

/** Выполняет функцию `onMount` когда компонент смотнирован и отрисован */
export default (onMount: () => void, onUnmount?: () => void) => {
    useLayoutEffect(() => {
        onMount();
        if (onUnmount)
            return onUnmount;
    }, []);
};
