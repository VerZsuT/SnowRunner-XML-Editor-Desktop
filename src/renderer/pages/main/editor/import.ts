import {afterUnmount} from 'react-afc'

type ImportHandler = () => void

export const importHandlers = new Set<ImportHandler>()

export function onImport(handler: ImportHandler) {
    importHandlers.add(handler)
    afterUnmount(() => importHandlers.delete(handler))
}
