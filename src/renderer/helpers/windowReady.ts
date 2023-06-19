import { useOnMount } from 'react-afc/compatible'

import type { ProgramWindow } from '#g/enums'
import { IPCChannel } from '#g/enums'
import { IPC } from '#r/services'

/** Посылает сигнал "окно готово к показу" после отрисовки компонента */
export default function windowReady(win: ProgramWindow): void {
  useOnMount(() => IPC.send(IPCChannel.windowReady + win))
}
