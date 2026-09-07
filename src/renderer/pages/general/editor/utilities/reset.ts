import type { IFile } from '@modules/files/types'
import type { IAttrDescriptor } from '@modules/xml/game/attributes'
import type { FileInfo } from '@modules/xml/renderer'
import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide } from 'vue'
import { importUtils } from './import'

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

  async emit(id: number) {
    return Promise.all([...(this.listeners[id] ?? [])].map(listener => listener()))
  }

  async getDefaultValue(file: IFile, info: FileInfo, descriptor: IAttrDescriptor): Promise<string | number | undefined> {
    const {DEFAULT_PARAMETER_VALUES} = await import('@modules/data/defaults/renderer')
    const name = importUtils.getName(file, info.dlc, info.mod)

    return DEFAULT_PARAMETER_VALUES[name]
      ?.[descriptor.selector]
      ?.[descriptor.name]
  }
}

export const resetUtils = new ResetUtils()
