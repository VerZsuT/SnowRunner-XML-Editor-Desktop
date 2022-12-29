import { CURRENT_DLC, CURRENT_MOD, FILE_PATH, LIST_SCROLL, OPENED_CATEGORY, OPENED_GROUP } from '#consts'
import type { Category } from '#enums'
import { storage } from '#services'
import type { IItem } from '#types'

class EditorService {
  setStorageValues(item: IItem, caregory: Category, listId: string): void {
    storage.set(FILE_PATH, item.path)
    storage.set(CURRENT_DLC, item.dlcName ?? 'undefined')
    storage.set(CURRENT_MOD, item.modId ?? 'undefined')
    storage.set(OPENED_CATEGORY, caregory)
    storage.set(OPENED_GROUP, listId.replace('list-', ''))
    storage.set(LIST_SCROLL, String(Math.round(document.querySelector(`#${listId} > div`)?.scrollTop || 0)))
  }
}

export default new EditorService()
