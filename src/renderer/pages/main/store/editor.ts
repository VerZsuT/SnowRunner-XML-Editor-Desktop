import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowRef } from 'vue'

import type { File, FileInfo } from '/mods/renderer'

const useStore = defineStore('editor', () => {
  const file = shallowRef<File | undefined>()
  const editedAction = ref(EditedAction.add)
  const showMessages = ref(true)
  const info = reactive<FileInfo>({})

  return {
    setFile(value: File) {
      file.value = value
    },
    setEditedAction(value: EditedAction) {
      editedAction.value = value
    },
    setShowMessages(value: boolean) {
      showMessages.value = value
    },
    setInfo(value: Partial<FileInfo>) {
      Object.assign(info, value)
    },
    file, editedAction, showMessages, info
  }
})

export function useEditorStore() {
  const store = useStore()
  return {
    ...store,
    file: computed(() => store.file),
    editedAction: computed(() => store.editedAction),
    showMessages: computed(() => store.showMessages)
  }
}

export enum EditedAction {
  add = 'add',
  remove = 'remove'
}
