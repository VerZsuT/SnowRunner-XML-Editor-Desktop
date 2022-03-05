/*
    Для создания доп. сценария в таблице требуется создать в этой папке `класс-обработчик` сценария.
    Для добавления этого сценария в шаблон добавляется свойство `actions` и там указывается название файла (путь относительно текущей папки, без расширения).
    Для отключения название файла добавляется в свойство `exclude` шиблона. Используется для отключения "глобальных" доп. сценариев в шаблоне `truck`.
*/

import { JSXElementConstructor, PureComponent } from 'react'
import type IActionProps from '../types/IActionProps'
import type IActionData from '../types/IActionData'
import type Editor from 'modules/editor/main'

import Popup from 'modules/components/Popup'

type Component = JSXElementConstructor<IActionProps>

/** Базовый класс доп. сценария в окне таблицы. */
export default class ActionBase<S = any> extends PureComponent<IActionProps, S> {
    private actionName: string
    private Component: Component
    private minWidth: number
    private minHeight: number
    private editor: Editor

    constructor(props: IActionProps, actionData: IActionData, component: Component) {
        super(props)

        this.actionName = actionData.name
        this.Component = component
        this.minWidth = actionData.minWidth ?? 300
        this.minHeight = actionData.minHeight ?? 400
    }

    /** Экспортировать данные сценария. */
    public export(): any {
        return null
    }

    public import(_: any): void {}

    /** Запустить сценарий. */
    public async run(editor: Editor): Promise<boolean> {
        this.editor = editor
        editor.setState({
            custom: (
                <Popup
                    show={true}
                    onClose={() => this.closeCustom()}
                    title={this.actionName}
                    minHeight={this.minHeight}
                    minWidth={this.minWidth}
                >
                    <this.Component dom={this.props.dom} editor={editor}/>
                </Popup>
            )
        })

        return true
    }

    /** Закрыть окно сценария. */
    protected closeCustom() {
        this.editor.setState({ custom: null })
    }

    /** Сохранить текущий открытый файл в таблице. */
    protected async save(reload?: boolean) {
        await this.editor.save(false)
        if (reload) {
            this.editor.setState({
                isLoading: true,
                custom: null
            }, () =>
                window.location.reload()
            )
        }
    }
}
