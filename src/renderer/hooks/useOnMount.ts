/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

/** Выполняет функцию `onMount` когда компонент смотнирован */
export default (onMount: () => void, onUnmount?: () => void) => {
    useEffect(() => {
        onMount();
        if (onUnmount)
            return onUnmount;
    }, []);
};
