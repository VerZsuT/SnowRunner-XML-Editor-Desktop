import type { FSWatcher, WatchListener } from 'node:fs'

import debounce from 'debounce'
import type { MaybeRef } from 'vue'
import { onUnmounted, ref, watchEffect } from 'vue'

import type { File } from '/mods/renderer'

import { useEditorStore } from '../../store'

export type UpdateListener = () => void | Promise<void>

/** Работа с файлами в таблице */
class FilesUtils {
  /** Добавить файлы в список */
  regFiles(source: MaybeRef<File[]>, direction: File[]) {
    const sourceRef = ref(source)

    watchEffect(() => {
      for (const file of sourceRef.value) {
        if (!direction.some(({ path }) => file.path === path)) {
          direction.push(file)
        }
      }
    })
  }

  /** Отследить изменения файлов */
  watch(listener: WatchListener<string>, files: MaybeRef<File[]>) {
    const { isSaving } = useEditorStore()
    const filesRef = ref(files)

    const watchers: FSWatcher[] = []
    const watched: File[] = []
    
    const watchListener = debounce((event, fileName) => {
      if (!isSaving.value) {
        listener(event, fileName)
      }
    }, 200)

    const watchFile = (file: File) => {
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
