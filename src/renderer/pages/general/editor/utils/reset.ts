import type { InjectionKey } from 'vue'
import { inject, onMounted, onUnmounted, provide } from 'vue'
import ImportUtils from './import'
import type { FileInfo, IFile } from '/mods/renderer'
import type { IAttrDescriptor } from '/mods/xml/game/attributes'

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
    const defaults = (await import('/mods/data/defaults/renderer')).default
    const name = ImportUtils.getName(file, info.dlc, info.mod)
    
    return defaults[name]
      ?.[descriptor.selector]
      ?.[descriptor.name]
  }
}

export default new ResetUtils()
