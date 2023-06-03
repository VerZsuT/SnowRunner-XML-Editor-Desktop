import { useOnRender } from 'react-afc'

import { ModsService } from '../../services'
import type ModsPopupModel from './modspopup.model'
import type IModsPopupProps from './modspopup.props'

import type { IFindItem } from '#g/types'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { Config } from '#r/services'

export default class ModsPopupController extends ViewController<IModsPopupProps, ModsPopupModel> {
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
    ModsService.save(this.model.targetKeys, this.model.items)
    this.props.hidePopup(true)
  }

  hidePopup(): void {
    if (!this.model.items) return
    this.model.targetKeys = this.getTargetKeys(this.model.items)
    this.props.hidePopup(false)
  }

  async addManual(): Promise<void> {
    const { items } = this.model
    const mod = await ModsService.requestMod()
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
        ModsService.load().then(items => {
          this.model.items = items
          this.model.targetKeys = this.getTargetKeys(items)
        })
      }, 500)
    }
  }

  private getTargetKeys(items: IFindItem[]): string[] {
    const keys = ModsService.itemToKeys(items)

    return Object.values(Config.mods.items)
      .filter(value => keys.includes(value.path))
      .map(value => value.path)
  }
}
