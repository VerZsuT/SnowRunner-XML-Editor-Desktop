import { Fragment } from "react";

import { Typography } from "antd";
import MessageType from "enums/MessageType";

const { Paragraph, Text } = Typography;

/** Агрумент любого содержания (кроме пустого) */
export const ANY = "ANY_ARGUMENT";
/** Опциональный аргумент (может быть пустым) */
export const OPTIONAL = "OPTIONAL_ARGUMENT";

type ArgsType = typeof ANY | string | readonly string[];
type CmdHandler<T extends ArgsCheckObj> = (args?: CheckedArgs<T>, error?: JSX.Element) => any;
type CheckedArgs<T extends ArgsCheckObj> = {
    [name in keyof T]: T[name] extends readonly string[] ? T[name][number] : T[name]
};

interface ArgsCheckObj {
    [propName: string]: ArgsType | [typeof OPTIONAL, ArgsType];
}

/** Сообщение в стиле лога. */
export function log(text: string) {
    return create(text);
}

/** Сообщение в стиле предупреждения. */
export function warn(text: string) {
    return create(text, MessageType.warn);
}

/** Сообщение в стиле ошибки. */
export function error(text: string) {
    return create(text, MessageType.error);
}

/** Сообщение в стиле информации. */
export function info(text: string) {
    return create(text, MessageType.info);
}

function create(text: string, type?: MessageType) {
    const items = text.split("\n");
    let color = "white";

    switch (type) {
    case MessageType.warn:
        color = "yellow";
        break;
    case MessageType.error:
        color = "red";
        break;
    case MessageType.info:
        color = "lightblue";
        break;
    }

    return (
        <Paragraph className={`color-${color} pargf`}>
            <span className="sharp">#&nbsp;</span>
            {items.map((item, key) => (
                <Fragment key={key}>
                    <Text className="break-all">
                        {item}
                    </Text>
                </Fragment>
            ))}
        </Paragraph>
    );
}

/**
 * Оборачивает функцию для автоматической проверки аргументов. Для проверки используется `argsCheckObj`.
 *
 * В случае ошибки `listener` не будет вызван, а в консоль выведется ошибка.
*/
export function addCheck<T extends ArgsCheckObj>(handler: CmdHandler<T>, argsType?: T) {
    function checkArgs(args: string[]) {
        const checkedArgs: { [name: string]: string } = {};
        let counter = 0;

        if (!argsType)
            return { checkedArgs: checkedArgs as CheckedArgs<T> };

        for (const propName in argsType) {
            let isOptional = false;
            let checker = argsType[propName];
            const argument = args[counter];

            if (checker instanceof Array && checker[0] === OPTIONAL) {
                checker = checker[1] as unknown as T[Extract<keyof T, string>];
                isOptional = true;
            }

            if (argument === undefined) {
                if (isOptional)  
                    continue;
                 
                const message = checker instanceof Array ? `[${checker.join(" | ")}]` : checker;
                return { error: warn(`Недостаточно аргументов для выполнения команды. На позиции ${counter + 1} ожидалось ${message}`) };
            }

            if (checker === ANY)
                continue;

            if (checker instanceof Array) {
                if (!checker.includes(argument))
                    return { error: warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось [${checker.join(" | ")}]`) };
            }
            else if (checker !== argument) { 
                return { error: warn(`Неверный аргумент на позиции ${counter + 1}. Ожидалось ${checker}`) };
            }

            ++counter;
            checkedArgs[propName] = argument;
        }
        return { checkedArgs: checkedArgs as CheckedArgs<T> };
    }

    return (args: string[]) => {
        const { checkedArgs, error } = checkArgs(args);

        if (checkedArgs)
            handler(checkedArgs);
        else if (error)
            return error;
    };
}

export const help = {
    checkUpdate: "- checkUpdate \nПринудительная проверка обновления (игнорирует настройку \"обновления\").",
    exportAll: "- exportAll \nЭкспортирует все параметры всех авто и их зависимостей в файл в папке backups.",
    devTools: "- devTools enable|disable \nВключает/выключает devTools на всех последующих страницах.",
    whatsNew: "- whatsNew \nОткрывает окно \"Что нового\".",
    version: "- version \nТекущая версия программы.",
    archive: "- archive saveChanges|unpack \nСохраняет изменения или распаковывает initial.pak",
    reload: "- reload \nПерезагрузка программы.",
    backup: "- backup save|restore \nСохраняет/восстанавливает бэкап initial.pak",
    config: "- config import|export \nИмпорт/экспорт конфиг-файла.",
    reset: "- reset \nСброс настроек программы.",
    help: "- help [<cmd_name>] \ncmd_name - имя команды.\nПомощь по командам консоли.",
    exit: "- exit \nЗакрытие консоли.",
    quit: "- quit \nЗакрытие программы.",
    set: "- set <setting_name> true|false \nУстанавливает значение настройки.",
    lang: "- lang RU|EN|DE|CH \nУстанавливает язык перевода программы.",
    epf: "- epf see|join \nПозволяет работать с файлами .epf.",
    toString() {
        const array = [];

        for (const cmdName in help) {
            if (cmdName === "toString")
                continue;
            array.push(help[cmdName]);
        }
        return array.join("\n\n");
    }
};
