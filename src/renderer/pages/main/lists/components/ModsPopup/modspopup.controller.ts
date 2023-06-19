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
    this.addItems(await ModsService.requestMods())
  }

  async addManualFolder(): Promise<void> {
    this.addItems(await ModsService.requestFromFolders())
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

  private async addItems(items?: Awaited<ReturnType<typeof ModsService.requestFromFolders>>): Promise<void> {
    const modelItems = this.model.items
    if (!items || !modelItems) return

    const result: IFindItem[] = [...modelItems]
    for (const mod of items) {
      if (modelItems.find(item => item.name === mod.id)) continue
      result.push({
        name: mod.id,
        path: mod.path
      })
    }

    this.model.items = result
  }
}
