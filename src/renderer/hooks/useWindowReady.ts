import type Window from "enums/Window";

import useLayoutOnMount from "./useLayoutOnMount";

const { send } = window.ipc;

/** Вызывает событие `window-ready`, означающее готовность окна к показу */
export default (window: Window) => {
    useLayoutOnMount(() => {
        send(`window-${window}-ready`);
    });
};
