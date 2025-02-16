import { defineStore } from 'pinia'
import { reactive, ref, shallowRef } from 'vue'
import type { FileInfo, IFile } from '/mods/renderer'

export const useEditorStore = defineStore('editor', () => {
  const editedAction = ref(EditedAction.markAsEdited)
  const showMessages = ref(true)
  const isSaving = ref(false)
  const file = shallowRef<IFile | undefined>()
  const info = reactive<FileInfo>({})
  const allFiles = reactive({
    main: null as null | IFile,
    engines: [] as IFile[],
    winches: [] as IFile[],
    suspensions: [] as IFile[],
    gearboxes: [] as IFile[],
    wheels: [] as IFile[]
  })

  return {
    clearEditorStore() {
      file.value = undefined
      editedAction.value = EditedAction.markAsEdited
      showMessages.value = true
      isSaving.value = false
      info.dlc = undefined
      info.isBackup = undefined
      info.mod = undefined
      allFiles.main = null
      allFiles.engines.length = 0
      allFiles.winches.length = 0
      allFiles.suspensions.length = 0
      allFiles.gearboxes.length = 0
      allFiles.wheels.length = 0
    },
    /** Изменить текущий файл */
    setFile(value: IFile) {
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

/** Действие с маркировкой "изменённый" */
export enum EditedAction {
  /** Пометить как "изменённый" */
  markAsEdited = 'markAsEdited',
  /** Пометить как "неизмененный" */
  markAsNotEdited = 'markAsNotEdited'
}
