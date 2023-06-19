import { CURRENT_DLC, CURRENT_MOD, FILE_PATH, LIST_SCROLL, OPENED_CATEGORY, OPENED_GROUP } from '#g/consts'
import type { Category } from '#g/enums'
import type { IItem } from '#g/types'
import { Storage } from '#r/services'

export default class EditorService {
  static setStorageValues(item: IItem, caregory: Category, listId: string): void {
    Storage.set(FILE_PATH, item.path)
    Storage.set(CURRENT_DLC, item.dlcName ?? 'undefined')
    Storage.set(CURRENT_MOD, item.modId ?? 'undefined')
    Storage.set(OPENED_CATEGORY, caregory)
    Storage.set(OPENED_GROUP, listId.replace('list-', ''))
    Storage.set(LIST_SCROLL, String(Math.round(document.querySelector(`#${listId} > div`)?.scrollTop || 0)))
  }
}
