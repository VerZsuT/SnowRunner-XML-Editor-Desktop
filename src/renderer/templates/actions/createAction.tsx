/*
    Для создания доп. сценария в таблице требуется создать в этой папке `класс-обработчик` сценария.
    Для добавления этого сценария в шаблон добавляется свойство `actions` и там указывается название файла (путь относительно текущей папки, без расширения).
    Для отключения название файла добавляется в свойство `exclude` шаблона. Используется для отключения "глобальных" доп. сценариев в шаблоне `truck`.
*/

import type {FC} from 'react'

import {Button, Modal} from 'antd'
import {afc, createState, inRender} from 'react-afc'
import type {ActionData, ActionProps} from 'types'
import './style.sass'

export function createAction(data: ActionData, Component: FC<ActionProps>) {
    const { name, onPressOk } = data

    const Action = afc((props: ActionProps) => {
        const [state, setState] = createState({
            isShow: true
        })
        let isClosing = false

        function onOk() {
            isClosing = true
            setState({ isShow: false })
            onPressOk?.()
        }

        inRender(() => {
            if (!isClosing)
                setState({ isShow: true })
            else
                isClosing = false
        })

        return () => (
            <Modal
                title={name}
                visible={state.isShow}
                closable={false}
                footer={[
                    <Button key='ok' onClick={onOk}>
                    OK
                    </Button>
                ]}
            >
                <Component {...props} />
            </Modal>
        )
    })

    return {
        data: {
            import: () => null,
            export: () => null,
            ...data
        },
        Component: Action
    }
}
