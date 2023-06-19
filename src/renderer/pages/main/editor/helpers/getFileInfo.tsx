import { createContext } from 'react'

import { CURRENT_DLC, CURRENT_MOD, FILE_PATH } from '#g/consts'
import { Storage } from '#r/services'

export interface FileInfoContextType {
  filePath: string
  mod: string
  dlc: string
}

export const FileInfoContext = createContext<FileInfoContextType>(null as unknown as FileInfoContextType)

export default function getFileInfo() {
  const filePath = Storage.get(FILE_PATH)
  const mod = Storage.get(CURRENT_MOD)
  const dlc = Storage.get(CURRENT_DLC)

  return {
    filePath, mod, dlc,
    fileInfoContext: {
      filePath, mod, dlc
    }
  }
}
