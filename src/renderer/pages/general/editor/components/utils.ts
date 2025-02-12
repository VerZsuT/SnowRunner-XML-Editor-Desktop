import type { CollapseProps } from 'ant-design-vue'
import type { InjectionKey, Ref } from 'vue'
import { inject, onMounted, provide, reactive, ref, watch } from 'vue'
import { GameTexts } from '/mods/renderer'
import type { EmitsToProps } from '/rend/types'
import { hasItems } from '/utils/renderer'

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key?: string, preset?: string, mod?: string): string {
  if (!key) {
    return preset ?? 'LABEL_ERROR'
  }
  
  const gameValue = GameTexts.main[key]
  const modValue = GameTexts.mods[mod ?? '']?.[key]
  
  return modValue ?? gameValue ?? `${preset}: ${key}`
}

export type ReadyProps = EmitsToProps<ReadyEmits>
export type ReadyEmits = {
  /** Событие готовности таблицы. */
  ready: []

  /** Событие `onMount` компонента. */
  mount: []
}
export type EmitFn =
  ((evt: 'ready') => void) &
  ((evt: 'mount') => void)

export function useFilesReady(emit: EmitFn, dynamic = false) {
  const ready = reactive<Set<string>>(new Set())
  const inProgress = reactive<Set<string>>(new Set())
  
  onMounted(() => {
    emit('mount')

    if (inProgress.size === 0 && !dynamic) {
      emit('ready')
    }
  })
  watch(ready, () => {
    for (const type of inProgress) {
      if (!ready.has(type)) {
        return
      }
    }

    emit('ready')
  })

  return {
    ready: (type: string) => void ready.add(type),
    inProgress: (type: string) => void inProgress.add(type)
  }
}

export function useReady(emit: EmitFn) {
  onMounted(() => {
    emit('mount')
    emit('ready')
  })
}

const IS_ACTIVE_KEY = Symbol('is-active') as InjectionKey<Ref<boolean>>
const ACTIVE_KEY = Symbol('active-key') as InjectionKey<Ref<string | undefined>>

export function provideActive(alwaysActive = false) {
  const isActive = ref(false)
  const activeKey = ref<string | undefined>()

  provide(IS_ACTIVE_KEY, alwaysActive
    ? ref(true)
    : isActive
  )
  provide(ACTIVE_KEY, activeKey)

  const onKeyChange: CollapseProps['onChange'] = key => {
    const value = Array.isArray(key)
      ? hasItems(key)
      : key !== undefined
    const active = key === undefined
      ? undefined
      : Array.isArray(key)
        ? String(key[0])
        : String(key)

    if (value) {
      isActive.value = value
      activeKey.value = active
    } else {
      setTimeout(() => {
        isActive.value = value
        activeKey.value = active
      }, 200)
    }
  }

  return { onKeyChange }
}

export function provideGroupActive(key: string) {
  const isParentActive = inject(IS_ACTIVE_KEY, ref(true))
  const activeKey = inject(ACTIVE_KEY, ref(undefined))
  const isActive = ref(false)

  provide(IS_ACTIVE_KEY, isActive)
  watch(activeKey, () => {
    isActive.value = activeKey.value === key
  })

  return { isParentActive }
}

export function useActive() {
  return { isActive: inject(IS_ACTIVE_KEY, ref(true)) }
}
