import { useOnMount } from 'react-afc/compatible'

import type { ProgramWindow } from '#g/enums'
import { IPCChannel } from '#g/enums'
import { ipc } from '#r/services'

/** Посылает сигнал "окно готово к показу" после отрисовки компонента */
function windowReady(win: ProgramWindow) {
  useOnMount(() => ipc.send(IPCChannel.windowReady + win))
}

export default windowReady
