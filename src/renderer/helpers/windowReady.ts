import { onMount } from 'react-afc/compatible'

import type { ProgramWindow } from '#enums'
import { IPCChannel } from '#enums'
import { ipc } from '#services'

export function windowReady(win: ProgramWindow) {
  onMount(() => ipc.send(IPCChannel.windowReady + win))
}
