import { useEffect, useState } from "react";

import { Typography, Button } from "antd";
import Window from "enums/Window";
import useWindowReady from "hooks/useWindowReady";
import config from "scripts/config";
import { render } from "scripts/helpers";
import main from "scripts/main";

import "./style.scss";
import texts from "./texts";

const { Title } = Typography;
const { update } = main;
const { on } = window.ipc;
const { settings } = config;

const {
    ALLOW_NEW_VERSION_AUTO,
    UPDATE,
    IGNORE,
    CLOSE
} = texts;

const UpdateWindow = () => {
    useWindowReady(Window.Update);

    const [version, setVersion] = useState("");

    useEffect(initController, []);

    function initController() {
        on("content", (_event, data) => setVersion(data));
    }

    return <>
        <Title className="version-title" level={4}>
            {ALLOW_NEW_VERSION_AUTO} {` (v${version})`}
        </Title>
        <div className="buttons">
            <Button type="primary" onClick={updateProgram}>{UPDATE}</Button>
            <Button type="primary" danger onClick={ignoreUpdate}>{IGNORE}</Button>
            <Button onClick={closeWindow}>{CLOSE}</Button>
        </div>
    </>;
};

function closeWindow() {
    window.close();
}

function updateProgram() {
    update();
}

function ignoreUpdate() {
    settings.updates = false;
    window.close();
}

render(<UpdateWindow />);
