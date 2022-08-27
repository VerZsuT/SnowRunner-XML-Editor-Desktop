import type {Window} from 'enums'
import {afterDraw} from 'react-afc'

const { send } = window.ipc

export function windowReady(win: Window) {
    afterDraw(() => send(`window-${win}-ready`))
}
