import { useOnMount } from 'react-afc/compatible'

import type { ProgramWindow } from '#enums'
import { IPCChannel } from '#enums'
import { ipc } from '#services'

function useWindowReady(win: ProgramWindow) {
  useOnMount(() => ipc.send(IPCChannel.windowReady + win))
}

export default useWindowReady
