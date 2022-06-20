import { useState } from "react";

import { Button, Switch, Typography } from "antd";
import Language from "components/Language";
import Window from "enums/Window";
import globalTexts from "globalTexts/renderer";
import useIPCMessage from "hooks/useIPCMessage";
import useWindowReady from "hooks/useWindowReady";
import config from "scripts/config";
import { render } from "scripts/helpers";
import main from "scripts/main";

import texts from "./texts";
import "./style.scss";

const { Text } = Typography;
const { settings } = config;
const { reload } = main;

const {
    UPDATES_LABEL,
    DLC_LABEL,
    MODS_LABEL,
    ADVANCED_MODE_LABEL
} = texts;
const { SAVE_BUTTON } = globalTexts;

const Settings = () => {
    useWindowReady(Window.Settings);
    useIPCMessage();

    const [updates, setUpdates] = useState(settings.updates);
    const [advanced, setAdvanced] = useState(settings.advancedMode);
    const [dlc, setDLC] = useState(settings.DLC);
    const [mods, setMods] = useState(settings.mods);

    function saveSettings() {
        config.settings = {
            ...settings,
            advancedMode: advanced,
            DLC: dlc,
            updates,
            mods
        };

        reload();
    }

    return <>
        <Language />
        <div className="checkboxes">
            <Switch size="small" onClick={toggler(setUpdates)} checked={updates} />
            <Text className="label">{UPDATES_LABEL}</Text>
            <br />
            <Switch size="small" onClick={toggler(setDLC)} checked={dlc} />
            <Text className="label">{DLC_LABEL}</Text>
            <br />
            <Switch size="small" onClick={toggler(setMods)} checked={mods} />
            <Text className="label">{MODS_LABEL}</Text>
            <br />
            <Switch size="small" onClick={toggler(setAdvanced)} checked={advanced} />
            <Text className="label">{ADVANCED_MODE_LABEL}</Text>
        </div>
        <Button
            className="not-upper"
            onClick={saveSettings}
            size="large"
            type="primary"
        >
            {SAVE_BUTTON}
        </Button>
    </>;
};

function toggler(func: (f: (prev: boolean) => boolean) => void) {
    return () => func(prev => !prev);
}

render(<Settings />);
