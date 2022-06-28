import { memo } from "react";

import { Select, Radio, RadioChangeEvent } from "antd";
import Lang from "enums/Lang";
import globalTexts from "globalTexts/renderer";
import config from "scripts/config";
import main from "scripts/main";

const { relaunchApp: reload } = main;
const { LANGUAGE_LABEL } = globalTexts;

interface IProps {
    isSetup?: boolean;
}

const langOptions = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
}));

/** Выбор язка программы */
export default memo((props: IProps) => (
    <div>
        {props.isSetup 
            ? (
                <Radio.Group
                    defaultValue={config.lang}
                    onChange={onChangeRadio}
                    optionType="button"
                    buttonStyle="solid"
                    options={langOptions}
                />
            )
            : <>
                <label htmlFor="lang-select" className="lang-label">
                    {LANGUAGE_LABEL}
                </label>
                <Select
                    id="lang-select"
                    onChange={changeLang}
                    value={config.lang}
                    size="large"
                    options={langOptions}
                />
            </>
        }
    </div>
));

function onChangeRadio(event: RadioChangeEvent) {
    config.lang = event.target.value;
    reload();
}

function changeLang(value: Lang) {
    config.lang = value;
    reload();
}
