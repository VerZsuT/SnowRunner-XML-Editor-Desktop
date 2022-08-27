import type {ChangeEvent, FocusEvent} from 'react'

import {Button, Input, message, Select, Spin, Typography} from 'antd'
import type {DefaultOptionType} from 'antd/lib/select'
import type {AnyNode, Cheerio, CheerioAPI} from 'cheerio'
import {load} from 'cheerio'
import {afcMemo, afterDraw, createState} from 'react-afc'
import {getGameText} from 'scripts/helpers'
import {localize} from 'scripts/localize'
import {main} from 'scripts/main'
import type {ActionProps, FindItem} from 'types'

import {createAction} from './createAction'
import {actionTexts} from './texts'

const { Text } = Typography

const {
    readFileSync, join, writeFileSync, existsSync,
    basename, readdirSync, isDirectory
} = window.service
const { paths, findInDir } = main
const {
    ADDON_NAME,
    ADDON_WHEELS,
    ADDON_FUEL,
    ADDON_REPAIRS,
    ADDON_CHANGE_BUTTON,
    CHANGED
} = actionTexts

interface ContentFieldProps {
    text: string
    value: string
    onChange(value: string): void
}

const ContentField = afcMemo<ContentFieldProps>(props => {
    function onChangeValue(e: ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value)
    }
    
    return () => (
        <div className='grid ac-content'>
            <Text>
                {props.text}
            </Text>
            <Input
                type='number'
                onChange={onChangeValue}
                value={props.value}
            />
        </div>
    )
})

export const AddonsContent = createAction({
    name: localize({
        RU: 'Содержимое аддонов',
        EN: 'Addons content',
        DE: 'Addon-Inhalt',
        CH: '附加组件的内容'
    }),
    id: 'addons-content',
    minHeight: 200,
    minWidth: 350,
    imgSRC: require('images/icons/wrench.png'),
    isActive() {
        return true
    }
}, afcMemo((props: ActionProps) => {
    let options: DefaultOptionType[] = []
    const [state, setState] = createState({
        items: null as FindItem[],
        selectedAddon: '',
        filter: '',
        wheels: '',
        repairs: '',
        fuel: ''
    })

    afterDraw(() => {
        const { filePath, currentMod } = props

        if (!state.items) {
            setTimeout(() => {
                const items = getAddons(basename(filePath, '.xml'), currentMod, isInstalled)
                const data = getAddonData(items[0].path)

                options = initOptions(items)
                setState({
                    items,
                    selectedAddon: items[0].name,
                    wheels: data.wheels,
                    repairs: data.repairs,
                    fuel: data.fuel
                })
            }, 500)
        }
    })

    const onChangeWheels = (wheels: string) => setState({ wheels })
    const onChangeRepairs = (repairs: string) => setState({ repairs })
    const onChangeFuel = (fuel: string) => setState({ fuel })
    const onBlurFilter = (e: FocusEvent<HTMLInputElement>) => {
        const filter = e.target.value
        const includesFilter = (item: FindItem) => getAddonName(item).toLowerCase().includes(filter.toLowerCase())
        options = initOptions(state.items.filter(includesFilter))
        setState({ filter })
    }
    
    return () => {
        const { selectedAddon, wheels, repairs, fuel, items } = state

        if (!items)
            return <Spin className='mods-spin' />

        return <>
            <div className='ac-main'>
                <Text>
                    {ADDON_NAME}
                </Text><br/>
                <Input
                    type='text'
                    onBlur={onBlurFilter}
                    className='ac-content'
                /><br/><br/>
                <Select
                    value={selectedAddon}
                    onChange={selectAddon}
                    options={options}
                />
            </div>
            <div className='grid ac-grid'>
                <ContentField text={ADDON_WHEELS} value={wheels} onChange={onChangeWheels} />
                <ContentField text={ADDON_REPAIRS} value={repairs} onChange={onChangeRepairs} />
                <ContentField text={ADDON_FUEL} value={fuel} onChange={onChangeFuel} />
            </div>

            <Button
                className='ac-save'
                onClick={saveChanges}
                type='primary'
            >
                {ADDON_CHANGE_BUTTON}
            </Button>
        </>
    }

    function selectAddon(name: string) {
        const data = getAddonData(getItem(name).path)
        setState({
            selectedAddon: name,
            wheels: data.wheels,
            repairs: data.repairs,
            fuel: data.fuel
        })
    }

    function isInstalled(dom: CheerioAPI) {
        const installSocket = dom('InstallSocket')

        if (!installSocket.length)  
            return false

        const type = installSocket.attr('Type')
        const el = props.dom(`Socket[Names*="${type}"]`)

        return el.length > 0
    }

    function saveChanges() {
        const { selectedAddon, fuel, wheels, repairs } = state
        const pathToAddon = getItem(selectedAddon).path
        const DOM = getDOM(pathToAddon)
        let TruckData = DOM('TruckAddon TruckData')

        if (!TruckData.length) {
            DOM('TruckAddon').eq(0).append('<TruckData></TruckData>')
            TruckData = DOM('TruckAddon TruckData').eq(0)
        }

        if (fuel && fuel !== '0')
            TruckData.attr('FuelCapacity', fuel)
        else if (TruckData.attr('FuelCapacity'))
            TruckData.removeAttr('FuelCapacity')

        if (wheels && wheels !== '0')
            TruckData.attr('WheelRepairsCapacity', wheels)
        else if (TruckData.attr('WheelRepairsCapacity'))
            TruckData.removeAttr('WheelRepairsCapacity')

        if (repairs && repairs !== '0')
            TruckData.attr('RepairsCapacity', repairs)
        else if (TruckData.attr('RepairsCapacity'))
            TruckData.removeAttr('RepairsCapacity')

        if ((!fuel || fuel === '0') && (!wheels || wheels === '0') && (!repairs || repairs === '0') && TruckData.attr())
            TruckData.remove()

        writeFileSync(pathToAddon, DOM.html())
        message.success(CHANGED)
    }

    function initOptions(items: FindItem[]): DefaultOptionType[] {
        if (!items)
            return []

        return items.map(addon => ({
            value: addon.name,
            label: getAddonName(addon)
        }))
    }

    function getAddonName(addon: FindItem) {
        const dom = getDOM(addon.path)
        const uiDesc = dom('UiDesc')
        const key = uiDesc.length ? uiDesc.attr('UiName') : null

        return getGameText(key, props.currentMod) || addon.name
    }

    function getItem(name?: string) {
        const { items, selectedAddon } = state
        const itemName = name ?? selectedAddon
        return items.filter(item => item.name === itemName)[0]
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
            wheels,
            repairs,
            fuel
        }
    }

    function getDOM(path?: string) {
        const filePath = path ?? getItem().path

        if (!existsSync(filePath))  
            return
        
        return load(readFileSync(filePath), { xmlMode: true })
    }

    function getAddons(truckName: string, modId?: string, filter?: (fileDOM: CheerioAPI) => boolean) {
        const allAddons: FindItem[] = []
        const out: FindItem[] = []
        const pathToTuning = join(paths.classes, `trucks/${truckName}_tuning`)

        if (existsSync(pathToTuning)) {
            allAddons.push(...readdirSync(pathToTuning).map(item => {
                if (isDirectory(join(pathToTuning, item)))
                    return null

                return {
                    name: item,
                    path: join(pathToTuning, item)
                }
            })) 
        }

        const pathToBasic = join(paths.classes, 'trucks/addons')
        if (existsSync(pathToBasic)) {
            allAddons.push(...readdirSync(pathToBasic).map(name => ({
                name,
                path: join(pathToBasic, name)
            }))) 
        }

        readdirSync(paths.dlc).forEach(dlcFolder => {
            const pathToDLCTrucks = join(paths.dlc, dlcFolder, 'classes/trucks')
            if (existsSync(pathToDLCTrucks)) {
                const pathToDLCBasic = join(pathToDLCTrucks, 'addons')
                if (existsSync(pathToDLCBasic)) {
                    allAddons.push(...readdirSync(pathToDLCBasic).map(name => ({
                        name,
                        path: join(pathToDLCBasic, name)
                    })))
                }

                readdirSync(pathToDLCTrucks).forEach(item => {
                    if (isDirectory(join(pathToDLCTrucks, item)) && item.endsWith('_tuning')) {
                        allAddons.push(...readdirSync(join(pathToDLCTrucks, item)).map(name => ({
                            name,
                            path: join(pathToDLCTrucks, item, name)
                        })))
                    }
                })
            }
        })

        if (modId) {
            allAddons.push(...findInDir(join(paths.modsTemp, modId, 'classes'), false, '.xml', true).filter(item => {
                if (!existsSync(item.path))
                    return false

                return !!load(readFileSync(item.path), {xmlMode: true})('TruckAddon').length
            })) 
        }

        allAddons.forEach(addon => {
            if (filter) {
                if (filter(load(readFileSync(addon.path), { xmlMode: true })))
                    out.push(addon)
            }
            else {
                out.push(addon)
            }
        })
    
        return out
    }
}))
