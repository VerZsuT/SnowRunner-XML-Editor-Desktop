import { useEffect } from "react";

import makeCallback from "hooks/makeCallback";

type Register = (id: string, callback: ()=>void) => void;
type Unregister = (id: string) => void;

interface IResetConfig {
    /** Функция добавления к сбросу */
    register: Register;
    /** Функция удаления из сброса */
    unregister: Unregister;
    /** ID компонента */
    id: string;
    /**
     * Выполняется во время сброса.
     * Без зависимостей - `функция`.
     * С зависимостями - `[функция, [зависимости]]`
     */
    callback: (()=>void) | [()=>void, any[]];
}

/** Добавляет возможность сброса параметра */
export default (config: IResetConfig) => {
    const { register, unregister, id } = config;
    const callback = makeCallback(config.callback);

    useEffect(() => {
        register(id, callback);
        return () => {
            if (unregister)
                unregister(id);
        };
    }, [register, unregister, callback, id]);
};
