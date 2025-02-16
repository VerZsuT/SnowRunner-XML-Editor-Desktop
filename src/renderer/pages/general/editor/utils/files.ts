import debounce from 'debounce'
import type { FSWatcher, WatchListener } from 'node:fs'
import { storeToRefs } from 'pinia'
import type { MaybeRef } from 'vue'
import { onUnmounted, ref, watchEffect } from 'vue'
import { useEditorStore } from '../../store'
import type { IFile } from '/mods/renderer'

export type UpdateListener = () => void | Promise<void>

/** Работа с файлами в таблице. */
class FilesUtils {
  /** Добавить файлы в список. */
  regFiles(source: MaybeRef<IFile[]>, direction: IFile[]) {
    const sourceRef = ref(source)

    watchEffect(() => {
      for (const file of sourceRef.value) {
        if (!direction.some(({ path }) => file.path === path)) {
          direction.push(file)
        }
      }
    })
  }

  /** Отследить изменения файлов. */
  watch(listener: WatchListener<string>, files: MaybeRef<IFile[]>) {
    const { isSaving } = storeToRefs(useEditorStore())
    const filesRef = ref(files)

    const watchers: FSWatcher[] = []
    const watched: IFile[] = []
    
    const watchListener = debounce((event, fileName) => {
      if (!isSaving.value) {
        listener(event, fileName)
      }
    }, 200)

    const watchFile = (file: IFile) => {
      watchers.push(file.watch((...args) => watchListener(...args)))
      watched.push(file)
    }

    watchEffect(() => {
      for (const file of filesRef.value) {
        if (!watched.some(({ path }) => file.path === path)) {
          watchFile(file)
        }
      }
    })

    onUnmounted(() => {
      for (const watcher of watchers) {
        watcher.removeAllListeners()
        watcher.close()
      }
      
      watchListener.clear()
      watchers.length = 0
    })
  }
}

export default new FilesUtils()
