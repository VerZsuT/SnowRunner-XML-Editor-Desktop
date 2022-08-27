import {createContext} from 'react'

export type ResetList = Set<()=>void>

interface ContextType {
    register(onReset: () => void): void
    unregister(onReset: () => void): void
}

export const ResetContext = createContext<ContextType>(null)

/**
 * Предоставляет список для функционала сброса
 * 
 * @returns [список, консекст]
 */
export function getResetProvider() {
    const resetList: ResetList = new Set()
    const register = (onReset: () => void) => resetList.add(onReset)
    const unregister = (onReset: () => void) => resetList.delete(onReset)
    const resetContext = { register, unregister } as ContextType

    return { resetList, resetContext }
}
