import { Fragment, useState } from "react";

import Lang from "enums/Lang";
import Window from "enums/Window";
import useConst from "hooks/useConst";
import useConstFunc from "hooks/useConstFunc";
import useWindowReady from "hooks/useWindowReady";
import config from "scripts/config";
import { getExported } from "scripts/dom";
import { render } from "scripts/helpers";
import main from "scripts/main";
import type IConfigSettings from "types/IConfigSettings";
import type IFindItem from "types/IFindItem";

import EditorConsole from "./components/EditorConsole";
import { addCheck, help, log, info, warn, OPTIONAL } from "./service";

import "./style.scss";

const {
    quit, reload, resetConfig, saveBackup, devTools,
    recoverFromBackup, checkUpdate, updateFiles,
    unpackFiles, importConfig, exportConfig,
    openWindow, findInDir,
    seeEPF, joinEPF, paths
} = main;
const { existsSync, writeFileSync, join } = window.service;

const title = (
    <Fragment key="0">
        {info("Командная строка v1.2.")}
    </Fragment>
);

interface IListeners {
    [cmd: string]: (args: string[]) => JSX.Element;
}

const Console = () => {
    useWindowReady(Window.Console);
    
    const [messages, setMessages] = useState([title]);
    const listeners = useConst(() => getListeners(pushMessage));

    const pushMessage = useConstFunc((msg: JSX.Element) => {
        setMessages(prev => [...prev, <Fragment key={prev.length}>{msg}</Fragment>]);
        document.querySelector("#messages").scrollTop = 10_000_000;
    });

    return <>
        <div id="messages" onClick={focusInput}>
            {messages}
        </div>
        <EditorConsole onError={pushMessage} listeners={listeners} />
    </>;
};

function getListeners(message: (m: JSX.Element) => void): IListeners {
    const cmds = Object.keys(help).filter(value => value !== "toString");
    type cmdsType = Exclude<keyof typeof help, "toString">;

    return {
        exit:
        addCheck(() => {
            window.close();
        }),

        quit:
        addCheck(() => {
            quit();
        }),

        reload:
        addCheck(() => {
            reload();
        }),

        reset:
        addCheck(() => {
            resetConfig(false);
        }),

        exportAll:
        addCheck(() => {
            const items: IFindItem[] = [];
            const exported: any = {};

            for (const dlcItem of config.dlc) {
                const path = `${dlcItem.path}\\classes`;

                items.push(...findInDir(join(path, "trucks")));
                items.push(...findInDir(join(path, "trucks/trailers")));
                items.push(...findInDir(join(path, "gearboxes")));
                items.push(...findInDir(join(path, "engines")));
                items.push(...findInDir(join(path, "suspensions")));
                items.push(...findInDir(join(path, "winches")));
                items.push(...findInDir(join(path, "wheels")));
            }

            items.push(...findInDir(join(paths.classes, "trucks")));
            items.push(...findInDir(join(paths.classes, "trucks/trailers")));
            items.push(...findInDir(join(paths.classes, "gearboxes")));
            items.push(...findInDir(join(paths.classes, "engines")));
            items.push(...findInDir(join(paths.classes, "suspensions")));
            items.push(...findInDir(join(paths.classes, "winches")));
            items.push(...findInDir(join(paths.classes, "wheels")));

            for (const item of items) {
                const obj = getExported(item.path);
                if (!obj)
                    continue;
                exported[`${item.name}.xml`] = obj;
            }

            writeFileSync(join(paths.backupFolder, "exported.json"), JSON.stringify(exported, null, "\t"));
            message(log("Все параметры были экспортированы в backups/exported.json"));
        }),

        devTools:
        addCheck(({ action }) => {
            if (action === "enable") {
                devTools(true);
                message(log("DevTools были включены для всех последующих окон."));
            }
            else {
                devTools(false);
                message(log("DevTools были выключены для всех последующих окон."));
            }
        }, { action: ["enable", "disable"] as const }),

        epf:
        addCheck(({ action }) => {
            if (action === "see")
                seeEPF();
            else
                joinEPF();
        }, { action: ["see", "join"] as const }),

        version:
        addCheck(() => {
            message(log(`Текущая версия программы: ${config.version}.`));
        }),

        set:
        addCheck(({ name, value }) => {
            if (config.settings[name] !== undefined) {
                config.settings[name] = value === "true" || false;
                message(log(`${name} = ${value}.`));
            }
        },
        {
            name: Object.keys(config.settings) as unknown as keyof IConfigSettings,
            value: ["true", "false"] as const
        }),

        lang:
        addCheck(({ lang }) => {
            config.lang = lang;
            reload();
        }, { lang: Object.keys(Lang) as unknown as Lang }),

        backup:
        addCheck(({ action }) => {
            if (action === "save")
                saveBackup();
            else
                recoverFromBackup();

            message(log("Операция проведена."));
        }, { action: ["save", "restore"] as const }),

        checkUpdate:
        addCheck(() => {
            message(log("Проверка обновления..."));
            message(log("В случае удачи выведется соответствующее окно."));
            checkUpdate();
        }),

        help:
        addCheck(({ cmd }) => {
            if (cmd) {
                if (!help[cmd]) {
                    message(warn(`Неизвестная команда "${cmd}".`));
                    return;
                }
                message(log(`Справка по команде "${cmd}"\n${help[cmd]}`));
            }
            else {
                message(log(`Список команд:\n${help.toString()}`));
            }
        }, { cmd: [OPTIONAL, cmds] as unknown as cmdsType }),

        archive:
        addCheck(({ action }) => {
            if (action === "saveChanges") {
                updateFiles();
                message(log("Изменения в файлах initial.pak сохранены."));
            }
            else {
                unpackFiles();
                message(log("initial.pak был распакован."));
            }
        }, { action: ["saveChanges", "unpack"] as const }),

        config:
        addCheck(({ action }) => {
            if (action === "import") {
                if (!existsSync(join(paths.backupFolder, "config.json"))) {
                    message(warn("Нет файла для импортирования."));
                    return;
                }
                importConfig();
                message(log("Конфиг был успешно импортирован."));
            }
            else {
                exportConfig();
                message(log("Конфиг был успешно экспортирован."));
            }
        }, { action: ["import", "export"] as const }),

        whatsNew:
        addCheck(() => {
            openWindow(Window.WhatsNew);
        })
    };
}

function focusInput() {
    (document.querySelector("#input") as HTMLInputElement).focus();
}

render(<Console />);
