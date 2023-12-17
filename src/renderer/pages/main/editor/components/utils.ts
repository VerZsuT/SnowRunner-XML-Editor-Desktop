import type { Directive } from 'vue'
import { onMounted, reactive, watch } from 'vue'

import { GameTexts } from '/mods/renderer'

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key?: string, preset?: string, mod?: string): string {
  if (!key) return preset ?? 'LABEL_ERROR'
  
  const gameValue = GameTexts.main[key]
  const modValue = GameTexts.mods[mod ?? '']?.[key]
  
  return modValue ?? gameValue ?? `${preset}: ${key}`
}

export type ReadyEmits = {
  ready: []
}

export function useFilesReady(emit: (evt: 'ready') => void, dynamic = false) {
  const ready = reactive<Set<string>>(new Set())
  const inProgress = reactive<Set<string>>(new Set())
  
  onMounted(() => {
    if (inProgress.size === 0 && !dynamic) emit('ready')
  })
  watch(ready, () => {
    for (const type of inProgress) {
      if (!ready.has(type)) return
    }
    emit('ready')
  })

  return {
    ready: (type: string) => ready.add(type),
    inProgress: (type: string) => inProgress.add(type),
    vFiles: {
      mounted: (_, { value }) => inProgress.add(value)
    } satisfies Directive<any, string>
  }
}

export function useReady(emit: (evt: 'ready') => void) {
  onMounted(() => emit('ready'))
}
