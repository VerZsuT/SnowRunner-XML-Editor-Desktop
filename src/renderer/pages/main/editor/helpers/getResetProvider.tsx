import { createContext } from 'react'

export type ResetList = Set<() => void>

interface ContextType {
  register(onReset: () => void): void
  unregister(onReset: () => void): void
}

export const ResetContext = createContext(null as unknown as ContextType)

/**
 * Предоставляет список для функционала сброса
 *
 * @returns [список, контекст]
 */
export function getResetProvider() {
  const resetList: ResetList = new Set()
  const register = (onReset: () => void) => resetList.add(onReset)
  const unregister = (onReset: () => void) => resetList.delete(onReset)
  const resetContext: ContextType = { register, unregister }

  return { resetList, resetContext }
}
