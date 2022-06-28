/*
    Для создания доп. сценария в таблице требуется создать в этой папке `класс-обработчик` сценария.
    Для добавления этого сценария в шаблон добавляется свойство `actions` и там указывается название файла (путь относительно текущей папки, без расширения).
    Для отключения название файла добавляется в свойство `exclude` шаблона. Используется для отключения "глобальных" доп. сценариев в шаблоне `truck`.
*/

import type { JSXElementConstructor } from "react";
import { PureComponent } from "react";

import { showPopup } from "components/Popup";
import type IActionData from "types/IActionData";
import type IActionProps from "types/IActionProps";
import type IActionRunProps from "types/IActionRunProps";
import IExportable from "types/IExportable";
import IImportable from "types/IImportable";

type Component = JSXElementConstructor<IActionProps>;

/** Базовый класс доп. сценария в окне таблицы. */
class ActionBase<S = any> extends PureComponent<IActionProps, S> implements IExportable<null>, IImportable<null> {
    private readonly actionName: string;
    private readonly minWidth: number;
    private readonly minHeight: number;
    private Component: Component;

    constructor(props: IActionProps, actionData: IActionData, component: Component) {
        super(props);

        this.actionName = actionData.name;
        this.Component = component;
        this.minWidth = actionData.minWidth ?? 300;
        this.minHeight = actionData.minHeight ?? 400;
    }

    /** Запустить сценарий. */
    public async run(props: IActionRunProps) {
        showPopup({
            title: this.actionName,
            minHeight: this.minHeight,
            minWidth: this.minWidth,
            children: <this.Component dom={this.props.dom} runProps={props} />
        });

        return true;
    }

    public export() {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public import(_: any) {
        console.log("Попытка импорта без реализации.");
    }

    /** Сохранить текущий открытый файл в таблице. */
    protected async save(reload?: boolean) {
        if (reload)
            window.location.reload();
    }
}

export default ActionBase;
