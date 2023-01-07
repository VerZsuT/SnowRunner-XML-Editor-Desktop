import type { FocusEvent } from 'react'

import type { SelectProps } from 'antd'
import { Button, Input, message, Select, Spin, Typography } from 'antd'
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import { load } from 'cheerio'
import { afcMemo, useOnMount, useReactive } from 'react-afc'

import $ from '../texts'
import ContentField from './ContentField'

import { isNonNullable } from '#gl-helpers'
import bridge from '#r-scripts/bridge'
import { helpers, system } from '#services'
import type { IActionProps, IFindItem } from '#types'

const { Text } = Typography
const paths = bridge.paths

type OptionsType = SelectProps['options']

function AddonsContentComponent(props: IActionProps) {
  let options: OptionsType = []

  const state = useReactive({
    items: null as IFindItem[] | null,
    selectedAddon: '',
    filter: '',
    wheels: '',
    repairs: '',
    fuel: ''
  })

  useOnMount(() => {
    const { filePath, currentMod } = props
    if (state.items) return

    setTimeout(() => {
      const items = getAddons(system.basename(filePath, '.xml'), currentMod, isInstalled)
      const data = getAddonData(items[0].path)

      options = initOptions(items)
      state.items = items
      state.selectedAddon = items[0].name
      state.wheels = data.wheels
      state.repairs = data.repairs
      state.fuel = data.fuel
    }, 500)
  })

  return () => {
    const { items, selectedAddon, wheels, repairs, fuel } = state

    if (!items) return <Spin className='mods-spin'/>

    return <>
      <div className='ac-main'>
        <Text>
          {$.ADDON_NAME}
        </Text><br/>
        <Input
          type='text'
          onBlur={onBlurFilter}
          className='ac-content'
          placeholder={$.ADDON_FILTER}
        /><br/><br/>
        <Select
          value={selectedAddon}
          onChange={selectAddon}
          options={options}
        />
      </div>
      <div className='grid ac-grid'>
        <ContentField text={$.ADDON_WHEELS} value={wheels} onChange={onChangeWheels}/>
        <ContentField text={$.ADDON_REPAIRS} value={repairs} onChange={onChangeRepairs}/>
        <ContentField text={$.ADDON_FUEL} value={fuel} onChange={onChangeFuel}/>
      </div>

      <Button
        className='ac-save'
        onClick={saveChanges}
        type='primary'
      >
        {$.ADDON_CHANGE_BUTTON}
      </Button>
    </>
  }

  function onChangeWheels(wheels: string): void {
    state.wheels = wheels
  }
  function onChangeRepairs(repairs: string): void {
    state.repairs = repairs
  }
  function onChangeFuel(fuel: string): void {
    state.fuel = fuel
  }

  function onBlurFilter(e: FocusEvent<HTMLInputElement>): void {
    if (!state.items) return

    const filter = e.target.value
    options = initOptions(state.items.filter(item => {
      return getAddonName(item)?.toLowerCase().includes(filter.toLowerCase())
    }))
    state.filter = filter
  }

  function selectAddon(name: string): void {
    const data = getAddonData(getItem(name)?.path)
    state.selectedAddon = name
    state.wheels = data.wheels
    state.repairs = data.repairs
    state.fuel = data.fuel
  }

  function isInstalled(dom: CheerioAPI): boolean {
    const installSocket = dom('InstallSocket')
    if (!installSocket.length) return false

    const type = installSocket.attr('Type')
    const el = props.dom(`Socket[Names*="${type}"]`)

    return el.length > 0
  }

  function saveChanges(): void | never {
    const { selectedAddon, fuel, wheels, repairs } = state

    const pathToAddon = getItem(selectedAddon)?.path
    const DOM = getDOM(pathToAddon)
    let TruckData = DOM?.('TruckAddon TruckData')

    if (!TruckData?.length) {
      DOM?.('TruckAddon').eq(0).append('<TruckData></TruckData>')
      TruckData = DOM?.('TruckAddon TruckData').eq(0)
    }

    if (fuel && fuel !== '0')
      TruckData?.attr('FuelCapacity', fuel)
    else if (TruckData?.attr('FuelCapacity'))
      TruckData?.removeAttr('FuelCapacity')

    if (wheels && wheels !== '0')
      TruckData?.attr('WheelRepairsCapacity', wheels)
    else if (TruckData?.attr('WheelRepairsCapacity'))
      TruckData?.removeAttr('WheelRepairsCapacity')

    if (repairs && repairs !== '0')
      TruckData?.attr('RepairsCapacity', repairs)
    else if (TruckData?.attr('RepairsCapacity'))
      TruckData?.removeAttr('RepairsCapacity')

    if ((!fuel || fuel === '0') && (!wheels || wheels === '0') && (!repairs || repairs === '0') && TruckData?.attr())
      TruckData?.remove()

    if (!pathToAddon) throw new Error('Path to addon not found')
    if (!DOM) throw new Error('DOM is undefined')

    system.writeFileSync(pathToAddon, DOM.html())
    void message.success($.CHANGED)
  }

  function initOptions(items: IFindItem[]): OptionsType {
    if (!items) return []

    return items.map(addon => ({
      value: addon.name,
      label: getAddonName(addon)
    }))
  }

  function getAddonName(addon: IFindItem): string | undefined {
    const dom = getDOM(addon.path)
    const uiDesc = dom?.('UiDesc')
    const key = uiDesc?.length ? uiDesc?.attr('UiName') : undefined

    return helpers.getGameText(key, props.currentMod) || addon.name
  }

  function getItem(name?: string): IFindItem | undefined {
    const { items, selectedAddon } = state
    const itemName = name ?? selectedAddon
    return items?.filter(item => item.name === itemName)[0]
  }

  function getAddonData(path?: string) {
    const DOM = getDOM(path)
    let TruckData: Cheerio<AnyNode>

    if (!DOM) {
      return {
        wheels: '',
        repairs: '',
        fuel: ''
      }
    }

    TruckData = DOM('TruckAddon TruckData')
    if (!TruckData.length) {
      DOM('TruckAddon').eq(0).append('<TruckData></TruckData>')
      TruckData = DOM('TruckAddon TruckData').eq(0)
    }

    const wheels = TruckData.attr('WheelRepairsCapacity') ?? '0'
    const repairs = TruckData.attr('RepairsCapacity') ?? '0'
    const fuel = TruckData.attr('FuelCapacity') ?? '0'

    return {
      wheels: wheels,
      repairs,
      fuel
    }
  }

  function getDOM(path?: string): CheerioAPI | undefined {
    const filePath = path ?? getItem()?.path ?? ''
    if (!system.existsSync(filePath)) return

    return load(system.readFileSync(filePath), { xmlMode: true })
  }

  function getAddons(truckName: string, modId?: string, filter?: (fileDOM: CheerioAPI) => boolean): IFindItem[] {
    const allAddons: IFindItem[] = []
    const out: IFindItem[] = []
    const pathToTuning = system.join(paths.classes, `trucks/${truckName}_tuning`)

    if (system.existsSync(pathToTuning)) {
      allAddons.push(...system.readdirSync(pathToTuning).map(item => {
        if (system.isDirectory(system.join(pathToTuning, item)))
          return

        return {
          name: item,
          path: system.join(pathToTuning, item)
        }
      }).filter(item => isNonNullable(item)) as IFindItem[])
    }

    const pathToBasic = system.join(paths.classes, 'trucks/addons')
    if (system.existsSync(pathToBasic)) {
      allAddons.push(...system.readdirSync(pathToBasic).map(name => ({
        name,
        path: system.join(pathToBasic, name)
      })))
    }

    system.readdirSync(paths.dlc).forEach(dlcFolder => {
      const pathToDLCTrucks = system.join(paths.dlc, dlcFolder, 'classes/trucks')
      if (system.existsSync(pathToDLCTrucks)) {
        const pathToDLCBasic = system.join(pathToDLCTrucks, 'addons')
        if (system.existsSync(pathToDLCBasic)) {
          allAddons.push(...system.readdirSync(pathToDLCBasic).map(name => ({
            name,
            path: system.join(pathToDLCBasic, name)
          })))
        }

        system.readdirSync(pathToDLCTrucks).forEach(item => {
          if (system.isDirectory(system.join(pathToDLCTrucks, item)) && item.endsWith('_tuning')) {
            allAddons.push(...system.readdirSync(system.join(pathToDLCTrucks, item)).map(name => ({
              name,
              path: system.join(pathToDLCTrucks, item, name)
            })))
          }
        })
      }
    })

    if (modId) {
      allAddons.push(...bridge.findInDir(system.join(paths.modsTemp, modId, 'classes'), false, '.xml', true).filter(item => {
        if (!system.existsSync(item.path))
          return false

        return !!load(system.readFileSync(item.path), { xmlMode: true })('TruckAddon').length
      }))
    }

    allAddons.forEach(addon => {
      if (filter) {
        if (filter(load(system.readFileSync(addon.path), { xmlMode: true })))
          out.push(addon)
      }
      else {
        out.push(addon)
      }
    })

    return out
  }
}

export default afcMemo(AddonsContentComponent)
