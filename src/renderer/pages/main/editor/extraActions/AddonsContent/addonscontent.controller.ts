import { message } from 'antd'
import { useOnMount } from 'react-afc'

import $ from '../texts'
import type OptionsType from './OptionsType'
import type AddonsContentModel from './addonscontent.model'

import type { IExtraActionProps, IFindItem, IXMLElement } from '#g/types'
import { isNonNullable } from '#g/utils'
import { ViewController } from '#r/model-ctrlr'
import Bridge from '#r/scripts/bridge'
import { XMLDOM } from '#r/scripts/xml'
import { Helpers, System } from '#r/services'

export default class AddonsContentController extends ViewController<IExtraActionProps, AddonsContentModel> {
  private static paths = Bridge.paths

  constructor(props: IExtraActionProps, model: AddonsContentModel) {
    super(props, model)

    useOnMount(() => {
      const { filePath, currentMod } = props
      if (this.model.items) return

      setTimeout(() => {
        const items = this.getAddons(System.basename(filePath, '.xml'), currentMod, this.isInstalled.bind(this))
        const data = this.getAddonData(items[0].path)

        model.options = this.initOptions(items)
        model.items = items
        model.selectedAddon = items[0].name
        model.wheels = data.wheels
        model.repairs = data.repairs
        model.fuel = data.fuel
      }, 500)
    })
  }

  changeWheels(value: string): void {
    this.model.wheels = value
  }

  changeRepairs(value: string): void {
    this.model.repairs = value
  }

  changeFuel(value: string): void {
    this.model.fuel = value
  }

  changeFilter(value: string): void {
    if (!this.model.items) return

    this.model.options = this.initOptions(this.model.items.filter(item => {
      return this.getAddonName(item)?.toLowerCase().includes(value.toLowerCase())
    }))
    this.model.filter = value
  }

  select(addonName: string): void {
    const data = this.getAddonData(this.getItem(addonName)?.path)
    this.model.selectedAddon = addonName
    this.model.wheels = data.wheels
    this.model.repairs = data.repairs
    this.model.fuel = data.fuel
  }

  save(): void {
    const { selectedAddon, fuel, wheels, repairs } = this.model

    const pathToAddon = this.getItem(selectedAddon)?.path
    const DOM = this.getDOM(pathToAddon)
    let TruckData = DOM?.select('TruckAddon TruckData')

    if (!TruckData?.exists) {
      DOM?.select('TruckAddon').appendTag('TruckData')
      TruckData = DOM?.select('TruckAddon TruckData')
    }

    if (fuel && fuel !== '0') {
      TruckData?.setAttr('FuelCapacity', fuel)
    }
    else if (TruckData?.getAttr('FuelCapacity')) {
      TruckData?.removeAttr('FuelCapacity')
    }

    if (wheels && wheels !== '0') {
      TruckData?.setAttr('WheelRepairsCapacity', wheels)
    }
    else if (TruckData?.getAttr('WheelRepairsCapacity')) {
      TruckData?.removeAttr('WheelRepairsCapacity')
    }

    if (repairs && repairs !== '0') {
      TruckData?.setAttr('RepairsCapacity', repairs)
    }
    else if (TruckData?.getAttr('RepairsCapacity')) {
      TruckData?.removeAttr('RepairsCapacity')
    }

    if ((!fuel || fuel === '0') && (!wheels || wheels === '0') && (!repairs || repairs === '0') && TruckData?.hasAttrs()) {
      TruckData?.remove()
    }

    if (!pathToAddon) throw new Error('Path to addon not found')
    if (!DOM) throw new Error('DOM is undefined')

    System.writeFileSync(pathToAddon, DOM.toHTML()!)
    void message.success($.CHANGED)
  }

  private isInstalled(dom: IXMLElement): boolean {
    const installSocket = dom.select('InstallSocket')
    if (!installSocket.exists) return false

    const type = installSocket.getAttr('Type')
    const el = this.props.dom.select(`Socket[Names*="${type}"]`)

    return el.exists
  }

  private initOptions(items: IFindItem[]): OptionsType {
    if (!items) return []

    return items.map(addon => ({
      value: addon.name,
      label: this.getAddonName(addon)
    }))
  }

  private getAddonName(addon: IFindItem): string | undefined {
    const dom = this.getDOM(addon.path)
    const uiDesc = dom?.select('UiDesc')
    const key = uiDesc?.exists ? uiDesc?.getAttr('UiName') : undefined

    return Helpers.getGameText(key, this.props.currentMod) || addon.name
  }

  private getItem(name?: string): IFindItem | undefined {
    const { items, selectedAddon } = this.model
    const itemName = name ?? selectedAddon
    return items?.filter(item => item.name === itemName)[0]
  }

  private getAddonData(path?: string) {
    const DOM = this.getDOM(path)
    let TruckData: IXMLElement

    if (!DOM) {
      return {
        wheels: '',
        repairs: '',
        fuel: ''
      }
    }

    TruckData = DOM.select('TruckAddon TruckData')
    if (!TruckData.exists) {
      DOM.select('TruckAddon').appendTag('TruckData')
      TruckData = DOM.select('TruckAddon TruckData')
    }

    const wheels = TruckData.getAttr('WheelRepairsCapacity') ?? '0'
    const repairs = TruckData.getAttr('RepairsCapacity') ?? '0'
    const fuel = TruckData.getAttr('FuelCapacity') ?? '0'

    return {
      wheels: wheels,
      repairs,
      fuel
    }
  }

  private getDOM(path?: string): IXMLElement | undefined {
    const filePath = path ?? this.getItem()?.path ?? ''
    if (!System.existsSync(filePath)) return

    return XMLDOM.fromPath(filePath)
  }

  private getAddons(truckName: string, modId?: string, filter?: (fileDOM: IXMLElement) => boolean): IFindItem[] {
    const allAddons: IFindItem[] = []
    const out: IFindItem[] = []
    const pathToTuning = System.join(AddonsContentController.paths.classes, `trucks/${truckName}_tuning`)

    if (System.existsSync(pathToTuning)) {
      allAddons.push(...System.readdirSync(pathToTuning).map(item => {
        if (System.isDirectory(System.join(pathToTuning, item))) {
          return
        }

        return {
          name: item,
          path: System.join(pathToTuning, item)
        }
      }).filter(item => isNonNullable(item)) as IFindItem[])
    }

    const pathToBasic = System.join(AddonsContentController.paths.classes, 'trucks/addons')
    if (System.existsSync(pathToBasic)) {
      allAddons.push(...System.readdirSync(pathToBasic).map(name => ({
        name,
        path: System.join(pathToBasic, name)
      })))
    }

    System.readdirSync(AddonsContentController.paths.dlc).forEach(dlcFolder => {
      const pathToDLCTrucks = System.join(AddonsContentController.paths.dlc, dlcFolder, 'classes/trucks')
      if (System.existsSync(pathToDLCTrucks)) {
        const pathToDLCBasic = System.join(pathToDLCTrucks, 'addons')
        if (System.existsSync(pathToDLCBasic)) {
          allAddons.push(...System.readdirSync(pathToDLCBasic).map(name => ({
            name,
            path: System.join(pathToDLCBasic, name)
          })))
        }

        System.readdirSync(pathToDLCTrucks).forEach(item => {
          if (System.isDirectory(System.join(pathToDLCTrucks, item)) && item.endsWith('_tuning')) {
            allAddons.push(...System.readdirSync(System.join(pathToDLCTrucks, item)).map(name => ({
              name,
              path: System.join(pathToDLCTrucks, item, name)
            })))
          }
        })
      }
    })

    if (modId) {
      allAddons.push(...Bridge.findInDir(System.join(AddonsContentController.paths.modsTemp, modId, 'classes'), false, '.xml', true).filter(item => {
        if (!System.existsSync(item.path)) {
          return false
        }

        return !!XMLDOM.fromPath(item.path).has('TruckAddon')
      }))
    }

    allAddons.forEach(addon => {
      if (filter) {
        if (filter(XMLDOM.fromPath(addon.path))) {
          out.push(addon)
        }
      }
      else {
        out.push(addon)
      }
    })

    return out
  }
}
