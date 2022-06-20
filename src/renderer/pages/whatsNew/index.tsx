import { List, Divider } from "antd";
import Window from "enums/Window";
import useWindowReady from "hooks/useWindowReady";
import { render } from "scripts/helpers";
import localize from "scripts/localize";

import texts from "./texts";

import "./style.scss";

const { WHATS_NEW_TITLE } = texts;

const data = localize({
    RU: [
        "Исправлен баг с распаковкой initial.pak при изменениях в модификациях.",
        "Исправлены ошибки в CH переводе (спасибо 杨 新民)."
    ],
    EN: [
        "Fixed bug with unpacking initial.pak when changing modifications.",
        "Fixed errors in CH translation (thanks to 杨 新民)."
    ],
    DE: [
        "Fehler beim Entpacken von initial.pak behoben, wenn Änderungen vorgenommen wurden.",
        "Fehler in der CH-Übersetzung behoben (Dank an 杨 新民)."
    ],
    CH: [
        "修正了修改时解压initial.pak的错误。",
        "修正了CH翻译中的错误 (感谢杨新民)。"
    ]
});

const WhatsNew = () => {
    useWindowReady(Window.WhatsNew);

    return <>
        <Divider>
            {WHATS_NEW_TITLE} {" v0.6.8b"}
        </Divider>
        <List
            size="small"
            dataSource={data}
            renderItem={item => (
                <List.Item>{`- ${item}`}</List.Item>
            )}
        />
    </>;
};

render(<WhatsNew />);
