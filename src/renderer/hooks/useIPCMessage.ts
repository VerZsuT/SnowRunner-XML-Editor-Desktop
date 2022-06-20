import { useEffect } from "react";

import { message } from "antd";

/** Позволяет выводить сообщения по IPC */
export default () => {
    useEffect(() => {
        window.handleErrorMessage = (msg: string) => {
            message.error(msg, 2);
        };
    }, []);
};
