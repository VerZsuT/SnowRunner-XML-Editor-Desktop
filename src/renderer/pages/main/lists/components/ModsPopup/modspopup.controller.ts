import { useOnRender } from 'react-afc'

import { modsService } from '../../services'
import type ModsPopupModel from './modspopup.model'
import type IModsPopupProps from './modspopup.props'

import type { IFindItem } from '#g/types'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { config } from '#r/services'

class ModsPopupController extends ViewController<IModsPopupProps, ModsPopupModel> {
  constructor(props: IModsPopupProps, model: ModsPopupModel) {
    super(props, model)

    useOnRender(this.loadMods)
    handleLocale()
  }

  changeTargetKeys(newKeys: string[]): void {
    this.model.targetKeys = newKeys
  }

  changeSelectedKeys(newKeys: string[]): void {
    this.model.selectedKeys = newKeys
  }

  saveChanges(): void {
    if (!this.model.items) return
    modsService.save(this.model.targetKeys, this.model.items)
    this.props.hidePopup(true)
  }

  hidePopup(): void {
    if (!this.model.items) return
    this.model.targetKeys = this.getTargetKeys(this.model.items)
    this.props.hidePopup(false)
  }

  addManual(): void {
    const { items } = this.model
    const mod = modsService.requestMod()
    if (!mod
      || !items
      || items.find(item => item.name === mod.id)
    ) return

    this.model.items = [
      ...items,
      {
        name: mod.id,
        path: mod.path
      }
    ]
  }

  private loadMods = (): void => {
    if (this.model.show && !this.model.items) {
      setTimeout(() => {
        modsService.load().then(items => {
          this.model.items = items
          this.model.targetKeys = this.getTargetKeys(items)
        })
      }, 500)
    }
  }

  private getTargetKeys(items: IFindItem[]): string[] {
    const keys = modsService.itemToKeys(items)

    return Object.values(config.mods.items)
      .filter(value => keys.includes(value.path))
      .map(value => value.path)
  }
}

export default ModsPopupController
