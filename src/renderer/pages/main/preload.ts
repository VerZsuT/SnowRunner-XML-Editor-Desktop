import '#r/scripts/root-preload.main'
import './editor/preload'
import './lists/preload'

import { PreloadType } from '#g/enums'
import type { IMainPreload } from '#g/types'
import Main from '#r/scripts/main'
import type { XMLElement } from '#r/scripts/xml'
import { XMLDOM } from '#r/scripts/xml'
import { Preload, System } from '#r/services/interprocess'

class _MainPreload {
  static readonly paths = Main.paths
  static readonly edited = Main.config.edited

  static cancelInitialChangesRestore = async (): Promise<void> => {
    System.rmdirSync(this.paths.backupInitialData)
    Main.config.edited = []
  }

  static restoreInitialChanges = async (): Promise<void> => {
    const changed = [...this.edited]
    for (const index in this.edited) {
      const file = this.edited[index]
      const originalPath = file.path.replace('mainTemp', 'backups/previous_initial')
      let originalDOM: XMLDOM
      let newDOM: XMLDOM
      if (!System.existsSync(file.path) || !System.existsSync(originalPath)
        || !(originalDOM = XMLDOM.fromPath(originalPath)).select('edited').exists
        || !(newDOM = XMLDOM.fromPath(file.path))
      ) {
        delete changed[index]
        continue
      }
      const edited = originalDOM.select('edited')
      for (const editedItem of edited.selectAll('item')) {
        const selector = editedItem.getAttr('selector')!.replaceAll('\']', '').replaceAll('[SXMLE_ID=\'', '#')
        let element: XMLElement | undefined
        for (const tag of selector.split('>').map(item => item.trim())) {
          if (!tag) continue

          const tagSelector = tag.includes('#') ? tag.split('#')[0] : tag
          const childIndex = tag.includes('#') ? Number(tag.split('#')[1]) : undefined

          if (childIndex) {
            const items = element ? element.selectAll(tagSelector) : newDOM.selectAll(tagSelector)
            if (childIndex <= items.length) {
              element = items[childIndex - 1]
            }
          }
          else {
            element = element ? element.select(tagSelector) : newDOM.select(tagSelector)
          }
          if (!element?.exists) {
            editedItem.remove()
            break
          }
          for (const editedAttr of editedItem.selectAll('attribute')) {
            element.setAttr(editedAttr.getAttr('name')!, editedAttr.getAttr('value'))
          }
        }
      }
      if (newDOM.select('edited')) newDOM.select('edited').remove()
      newDOM.append(`<edited>${edited.toHTML()}</edited>`)
      System.writeFileSync(file.path, newDOM.toHTML())
    }
    Main.config.edited = changed.filter(Boolean)
    await Main.updateFiles()
  }

  static {
    Preload.register<IMainPreload>({
      cancelInitialChangesRestore: this.cancelInitialChangesRestore,
      restoreInitialChanges: this.restoreInitialChanges
    }, PreloadType.main)
  }
}
