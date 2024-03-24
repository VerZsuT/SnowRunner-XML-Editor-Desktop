import { defineStore } from 'pinia'
import { computed, reactive, ref, shallowRef } from 'vue'

import type { File, FileInfo } from '/mods/renderer'

const useStore = defineStore('editor', () => {
  const editedAction = ref(EditedAction.markAsEdited)
  const showMessages = ref(true)
  const isSaving = ref(false)
  
  const file = shallowRef<File | undefined>()
  const info = reactive<FileInfo>({})
  const allFiles = reactive({
    main: null as null | File,
    engines: [] as File[],
    winches: [] as File[],
    suspensions: [] as File[],
    gearboxes: [] as File[],
    wheels: [] as File[]
  })

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
    /** Изменить состояние "сохранение" */
    setIsSaving(value: boolean) {
      isSaving.value = value
    },
    /** Текущий файл */
    file,
    /** Информация о файле */
    info,
    /** Все файлы */
    allFiles,
    /** Действие с маркировкой "изменённый" */
    editedAction,
    /** Показ сообщений */
    showMessages,
    /** Состояние "сохранение" */
    isSaving
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
    showMessages: computed(() => store.showMessages),
    /** Состояние "сохранение" */
    isSaving: computed(() => store.isSaving)
  }
}

/** Действие с маркировкой "изменённый" */
export enum EditedAction {
  /** Пометить как "изменённый" */
  markAsEdited = 'markAsEdited',
  /** Пометить как "неизменённый" */
  markAsNotEdited = 'markAsNotEdited'
}
