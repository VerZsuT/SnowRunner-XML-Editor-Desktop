import { useEffect, useState } from "react";

import { Button, Steps, Modal } from "antd";
import Header from "components/Header";
import Menu from "components/Menu";
import Window from "enums/Window";
import useIPCMessage from "hooks/useIPCMessage";
import useWindowReady from "hooks/useWindowReady";
import config from "scripts/config";
import { render } from "scripts/helpers";
import main from "scripts/main";

import Language from "../../components/Language";
import GameFolder from "./components/GameFolder";
import texts from "./texts";

import "./style.scss";

const { Step } = Steps;
const { confirm } = Modal;

const { importConfig, paths, saveBackup } = main;
const { existsSync, join } = window.service;
const { FIRST_STEPS_DESCRIPTION, IMPORT_CONFIG_MESSAGE } = texts;

const Setup = () => {
    useIPCMessage();
    useWindowReady(Window.Setup);

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        setTimeout(checkExportedConfig, 500);
    }, []);

    const stepsContent = [
        <Language isSetup key="language" />,
        <GameFolder key="game-folder" onChange={save} />
    ];

    function save(path: string) {
        config.initial = path;
        saveBackup(true);
    }

    return <>
        <Menu />
        <Header text={FIRST_STEPS_DESCRIPTION} />

        <Steps className="steps" current={current}>
            <Step title="Язык программы" />
            <Step title="Игровые данные" />
        </Steps>
        <div className="steps-content">{stepsContent[current]}</div>
        <div className="steps-actions">
            {current < stepsContent.length - 1 && (
                <Button type="primary" onClick={() => setCurrent(current + 1)}>
                    Дальше
                </Button>
            )}
        </div>
    </>;
};

function checkExportedConfig() {
    if (existsSync(join(paths.backupFolder, "config.json"))) {
        confirm({
            title: IMPORT_CONFIG_MESSAGE,
            onOk: () => importConfig()
        });
    }
}

render(<Setup />);
