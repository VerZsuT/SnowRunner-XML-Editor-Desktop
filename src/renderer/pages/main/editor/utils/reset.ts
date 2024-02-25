import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide } from 'vue'

export type ResetListenersList = Record<number, Set<ResetListener>>
export type ResetListener = () => Promise<any>
export type ResetData = {
  listen(listener: ResetListener): void
  removeListener(listener: ResetListener): void
}

class ResetUtils {
  readonly injectKey: InjectionKey<ResetData> = Symbol()
  readonly globalID = 0
  private readonly listeners: ResetListenersList = {}

  onReset(listener: ResetListener) {
    const { listen, removeListener } = inject(this.injectKey, { listen(){}, removeListener(){} })
    onMounted(() => listen(listener))
    onUnmounted(() => removeListener(listener))
  }

  provide(id = Math.random()) {
    provide(this.injectKey, {
      listen: listener => (this.listeners[id] ??= new Set()).add(listener),
      removeListener: listener => this.listeners[id]?.delete(listener)
    })
    return id
  }

  emit(id: number) {
    return Promise.all([...(this.listeners[id] ?? [])].map(listener => listener()))
  }
}

export default new ResetUtils()
