/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from "react";
import type { DependencyList } from "react";

import useConstFunc from "./useConstFunc";

type FuncType = (...args: DependencyList) => any;

/** Оборачивает аргумент в `useCallback` или `useConstRef` */
export default <F extends FuncType>(arg?: F | [F, DependencyList]): F => {
    if (!arg)
        return useConstFunc(<F>(() => null));

    if (arg instanceof Array)
        return useCallback<F>(arg[0], arg[1]);
    else
        return useConstFunc(arg);
};
