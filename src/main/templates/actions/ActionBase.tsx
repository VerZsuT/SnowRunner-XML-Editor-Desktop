/*
    Для создания доп. сценария в таблице требуется создать в этой папке `класс-обработчик` сценария.
    Для добавления этого сценария в шаблон добавляется свойство `actions` и там указывается название файла (путь относительно текущей папки, без расширения).
    Для отключения название файла добавляется в свойство `exclude` шиблона. Используется для отключения "глобальных" доп. сценариев в шаблоне `truck`.
*/

import { PureComponent } from "react";
import type { JSXElementConstructor } from "react";
import type IActionProps from "../types/IActionProps";
import type IActionData from "../types/IActionData";
import type Editor from "modules/editor/main";

import { showPopup } from "components/Popup";
import { showLoading } from "components/Loading";
import config from "scripts/config";

type Component = JSXElementConstructor<IActionProps>;

/** Базовый класс доп. сценария в окне таблицы. */
class ActionBase<S = any> extends PureComponent<IActionProps, S> {
    private actionName: object;
    private Component: Component;
    private minWidth: number;
    private minHeight: number;
    private editor: Editor;

    constructor(props: IActionProps, actionData: IActionData, component: Component) {
        super(props);

        this.actionName = actionData.name;
        this.Component = component;
        this.minWidth = actionData.minWidth ?? 300;
        this.minHeight = actionData.minHeight ?? 400;
    }

    /** Экспортировать данные сценария. */
    public export(): any {
        return null;
    }

    public import(_: any): void {}

    /** Запустить сценарий. */
    public async run(editor: Editor) {
        this.editor = editor;
        showPopup({
            title: this.actionName[config.lang],
            minHeight: this.minHeight,
            minWidth: this.minWidth,
            children: <this.Component dom={this.props.dom} editor={editor}/>
        });

        return true;
    }

    /** Сохранить текущий открытый файл в таблице. */
    protected async save(reload?: boolean) {
        await this.editor.save(false);
        if (reload) {
            showLoading();
            window.location.reload();
        }
    }
}

export default ActionBase;
