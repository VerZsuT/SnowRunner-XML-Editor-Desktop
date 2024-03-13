import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowRef } from 'vue'

import type { File, FileInfo } from '/mods/renderer'

const useStore = defineStore('editor', () => {
  const file = shallowRef<File | undefined>()
  const editedAction = ref(EditedAction.markAsEdited)
  const showMessages = ref(true)
  const info = reactive<FileInfo>({})

  return {
    /** Изменить текущий файл */
    setFile(value: File) {
      file.value = value
    },
    /** Изменить действие с маркировкой "изменённый" */
    setEditedAction(value: EditedAction) {
      editedAction.value = value
    },
    /** Изменить показ сообщений */
    setShowMessages(value: boolean) {
      showMessages.value = value
    },
    /** Изменить информацию о файле */
    setInfo(value: Partial<FileInfo>) {
      Object.assign(info, value)
    },
    /** Текущий файл */
    file,
    /** Действие с маркировкой "изменённый" */
    editedAction,
    /** Показ сообщений */
    showMessages,
    /** Информация о файле */
    info
  }
})

/** Хранилище для редактора */
export function useEditorStore() {
  const store = useStore()

  return {
    ...store,
    /** Текущий файл */
    file: computed(() => store.file),
    /** Текущее действие с маркировкой "изменённый" */
    editedAction: computed(() => store.editedAction),
    /** Показывать ли сообщения */
    showMessages: computed(() => store.showMessages)
  }
}

/** Действие с маркировкой "изменённый" */
export enum EditedAction {
  /** Пометить как "изменённый" */
  markAsEdited = 'markAsEdited',
  /** Пометить как "неизменённый" */
  markAsNotEdited = 'markAsNotEdited'
}
