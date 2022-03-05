import { ChangeEvent } from 'react'
import $ from 'cheerio'
import type { Cheerio, CheerioAPI, Element, Node } from 'cheerio'
import type IFindItem from 'modules/list/types/IFindItem'
import type IActionData from '../types/IActionData'
import type IActionProps from '../types/IActionProps'
import main from 'scripts/main'
import { getIngameText } from 'scripts/funcs'
import localize from 'scripts/localize'
import ActionBase from './ActionBase'

import { Button, MenuItem, Select, SelectChangeEvent, styled } from '@mui/material'
import Container from 'modules/components/styled/Container'
import InputLabel from 'modules/editor/styled/InputLabel' 
import TextField from 'modules/editor/styled/AddonTextField'
import MyGrid from 'modules/components/styled/Grid'

const { readFileSync, join, writeFileSync, existsSync, basename, readdirSync, isDirectory } = window.service
const { paths, findInDir } = main

const ContentGrid = styled(MyGrid)({
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center'
})

interface IState {
    items: IFindItem[]
    selectedAddon: string
    wheels: string
    repairs: string
    fuel: string
}

export const data: IActionData = {
    name: localize.ADDON_CONTENT,
    id: 'addons-content',
    minHeight: 200,
    minWidth: 350,
    imgSRC: require('images/icons/editor/wrench.png'),
    isActive: () => true
}

export default class AddonsContent extends ActionBase<IState> {
    private options: JSX.Element[] = []

    constructor(props: IActionProps) {
        super(props, data, AddonsContent)

        this.state = {
            items: null,
            selectedAddon: '',
            wheels: '',
            repairs: '',
            fuel: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.items === null) {
                const items = this.getAddons(basename(this.props.editor.filePath, '.xml'), this.props.editor.currentMod, this.isInstalled)
                const data = this.getAddonData(items[0].path)

                this.options = this.getOptions(items)
                this.setState({
                    items,
                    selectedAddon: items[0].name,
                    wheels: data.wheels,
                    repairs: data.repairs,
                    fuel: data.fuel
                })
            }
        }, 500)
    }

    render() {
        return <>
            <Container style={{ marginBottom: '10px' }}>
                <InputLabel id='addon-name-label'>
                    {localize.ADDON_NAME}
                </InputLabel>
                <Select
                    labelId='addon-name-label'
                    value={this.state.selectedAddon}
                    onChange={this.selectAddon}
                    size='small'
                >
                    {this.options}
                </Select>
            </Container>
            <MyGrid style={{ justifyContent: 'space-around'}}>
                <this.ContentField text={localize.ADDON_WHEELS} name='wheels'/>
                <this.ContentField text={localize.ADDON_REPAIRS} name='repairs'/>
                <this.ContentField text={localize.ADDON_FUEL} name='fuel'/>
            </MyGrid>

            <Button
                onClick={this.saveChanges}
                variant='contained'
                color='success'
            >
                {localize.ADDON_CHANGE_BUTTON}
            </Button>
        </>
    }

    private selectAddon = (e: SelectChangeEvent) => {
        const name = e.target.value
        const data = this.getAddonData(this.getItem(name).path)

        this.setState({
            selectedAddon: name,
            wheels: data.wheels,
            fuel: data.fuel,
            repairs: data.repairs
        })
    }

    private isInstalled = (dom: CheerioAPI) => {
        const installSocket = dom('InstallSocket')
        let type: string
        let el: Cheerio<Element>

        if (!installSocket.length) {
            return false
        }

        type = installSocket.attr('Type')
        el = this.props.dom(`Socket[Names*="${type}"]`)

        return !!el.length
    }

    private ContentField = (props: {text: string, name: keyof IState}) => {
        return (
            <ContentGrid>
                <InputLabel id='addon-fuel-label'>
                    {props.text}
                </InputLabel>
                <TextField
                    type='number'
                    value={this.state[props.name]}
                    onChange={this.onChange(props.name)}
                    size='small'
                    style={{ width: '80px' }}
                />
            </ContentGrid>
        )
    }

    private onChange(name: keyof IState) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            this.setState({
                [name]: event.target.value
            } as unknown as IState)
        }
    }

    private saveChanges = () => {
        const pathToAddon = this.getItem(this.state.selectedAddon).path
        const DOM = this.getDOM(pathToAddon)
        let TruckData = DOM('TruckAddon TruckData')

        if (!TruckData.length) {
            DOM('TruckAddon').eq(0).append('<TruckData></TruckData>')
            TruckData = DOM('TruckAddon TruckData').eq(0)
        }

        if (this.state.fuel && this.state.fuel !== '0')
            TruckData.attr('FuelCapacity', this.state.fuel)
        else if (TruckData.attr('FuelCapacity'))
            TruckData.removeAttr('FuelCapacity')

        if (this.state.wheels && this.state.wheels !== '0')
            TruckData.attr('WheelRepairsCapacity', this.state.wheels)
        else if (TruckData.attr('WheelRepairsCapacity'))
            TruckData.removeAttr('WheelRepairsCapacity')

        if (this.state.repairs && this.state.repairs !== '0')
            TruckData.attr('RepairsCapacity', this.state.repairs)
        else if (TruckData.attr('RepairsCapacity'))
            TruckData.removeAttr('RepairsCapacity')

        if ((!this.state.fuel || this.state.fuel === '0') && (!this.state.wheels || this.state.wheels === '0') && (!this.state.repairs || this.state.repairs === '0') && TruckData.attr()) {
            TruckData.remove()
        }

        writeFileSync(pathToAddon, DOM.html())
    }

    private getOptions(items: IFindItem[]) {
        if (!items)
            return []

        return items.map(addon => {
            const name = this.getAddonName(addon)
            return (
                <MenuItem key={addon.name} value={addon.name}>
                    {name}
                </MenuItem>
            )
        })
    }

    private getAddonName(addon: IFindItem) {
        const dom = this.getDOM(addon.path)
        const uiDesc = dom('UiDesc')
        const key = uiDesc.length ? uiDesc.attr('UiName') : null

        return getIngameText(key, this.props.editor.currentMod) || addon.name
    }

    private getItem(name?: string) {
        if (!name)
            name = this.state.selectedAddon

        return this.state.items.filter(item => item.name === name)[0]
    }

    private getAddonData(path?: string) {
        const DOM = this.getDOM(path)
        let TruckData: Cheerio<Node>
        let wheels: string
        let repairs: string
        let fuel: string

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

        wheels = TruckData.attr('WheelRepairsCapacity') || '0'
        repairs = TruckData.attr('RepairsCapacity') || '0'
        fuel = TruckData.attr('FuelCapacity') || '0'

        return {
            wheels: wheels,
            repairs: repairs,
            fuel: fuel
        }
    }

    private getDOM(path?: string) {
        if (!path)
            path = this.getItem().path

        if (!existsSync(path))
            return

        return $.load(readFileSync(path), { xmlMode: true })
    }

    private getAddons(truckName: string, modId?: string, filter?: (fileDOM: CheerioAPI) => boolean) {
        const allAddons: IFindItem[] = []
        const out: IFindItem[] = []
        const pathToTuning = join(paths.classes, `trucks/${truckName}_tuning`)
        let pathToBasic: string

        if (existsSync(pathToTuning)) {
            allAddons.push(...readdirSync(pathToTuning).map(item => {
                if (isDirectory(item))
                    return null

                return {
                    name: item,
                    path: join(pathToTuning, item)
                }
            }))
        }

        pathToBasic = join(paths.classes, `trucks/addons`)
        if (existsSync(pathToBasic)) {
            allAddons.push(...readdirSync(pathToBasic).map(name => {
                return {
                    name,
                    path: join(pathToBasic, name)
                }
            }))
        }

        for (const dlcFolder of readdirSync(paths.dlc)) {
            const pathToDLCTrucks = join(paths.dlc, dlcFolder, 'classes/trucks')
            if (existsSync(pathToDLCTrucks)) {
                const pathToDLCBasic = join(pathToDLCTrucks, 'addons')
                if (existsSync(pathToDLCBasic)) {
                    allAddons.push(...readdirSync(pathToDLCBasic).map(name => {
                        return {
                            name,
                            path: join(pathToDLCBasic, name)
                        }
                    }))
                }
                for (const item of readdirSync(pathToDLCTrucks)) {
                    if (isDirectory(item) && item.endsWith('_tuning')) {
                        allAddons.push(...readdirSync(join(pathToDLCTrucks, item)).map(name => {
                            return {
                                name,
                                path: join(pathToDLCTrucks, item, name)
                            }
                        }))
                    }
                }
            }
        }

        if (modId) {
            allAddons.push(...findInDir(join(paths.modsTemp, modId, 'classes'), false, '.xml', true).filter(item => {
                if (!existsSync(item.path))
                    return false

                if ($.load(readFileSync(item.path), {xmlMode: true})('TruckAddon').length)
                    return true

                return false
            }))
        }

        for (const addon of allAddons) {
            if (filter) {
                if (filter($.load(readFileSync(addon.path), {xmlMode: true}))) {
                    out.push(addon)
                }
            }
            else {
                out.push(addon)
            }
        }

        return out
    }
}
