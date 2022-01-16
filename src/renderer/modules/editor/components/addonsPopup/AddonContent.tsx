import { ChangeEvent, PureComponent } from 'react'
import { getIngameText, mainProcess, t } from 'scripts'

import {
    Button,
    InputLabel as MuiInputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField as MuiTextField,
    styled
} from '@mui/material'
import { Container } from 'modules/components/styled'

const { readFile, getAddons, saveFile, existsSync } = window.editorPreload
const { alertSync } = mainProcess

const InputLabel = styled(MuiInputLabel)({
    color: 'black'
})

const TextField = styled(MuiTextField)({
    marginBottom: '10px',
    width: '100px'
})

interface IProps {
    truckName: string
    fileDOM: Document
    modId: string
    show?: boolean
}

interface IState {
    items: FindItem[]
    selectedAddon: string
    wheels: string
    repairs: string
    fuel: string
}

export class AddonContent extends PureComponent<IProps, IState> {
    private options: JSX.Element[] = []

    constructor(props: IProps) {
        super(props)

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
                const items = getAddons(this.props.truckName, this.props.modId, this.isInstalled)
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
        if (!this.props.show) return null
        
        return <>
            <Container>
                <InputLabel id='addon-name-label'>
                    {t.ADDON_NAME}
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
            <Container>
                <InputLabel id='addon-wheels-label'>
                    {t.ADDON_WHEELS}
                </InputLabel>
                <TextField
                    type='number'
                    value={this.state.wheels}
                    onChange={this.changeWheels}
                    size='small'
                />
            </Container>
            <Container>
                <InputLabel id='addon-repairs-label'>
                    {t.ADDON_REPAIRS}
                </InputLabel>
                <TextField
                    type='number'
                    value={this.state.repairs}
                    onChange={this.changeRepairs}
                    size='small'
                />
            </Container>
            <Container>
                <InputLabel id='addon-fuel-label'>
                    {t.ADDON_FUEL}
                </InputLabel>
                <TextField
                    type='number'
                    value={this.state.fuel}
                    onChange={this.changeFuel}
                    size='small'
                />
            </Container>

            <Button
                onClick={this.saveChanges}
                variant='contained'
                color='success'
            >
                {t.ADDON_CHANGE_BUTTON}
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

    private isInstalled = (dom: Document) => {
        const installSocket = dom.querySelector('InstallSocket')
        if (!installSocket) {
            return false
        }
        const type = installSocket.getAttribute('Type')
        const el = this.props.fileDOM.querySelector(`Socket[Names*="${type}"]`)
        return Boolean(el)
    }

    private changeWheels = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            wheels: e.target.value
        })
    }

    private changeRepairs = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            repairs: e.target.value
        })
    }

    private changeFuel = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            fuel: e.target.value
        })
    }

    private saveChanges = () => {
        const pathToAddon = this.getItem(this.state.selectedAddon).path
        const DOM = this.getDOM(pathToAddon)
        const TruckAddon = DOM.querySelector('TruckAddon')
        let TruckData = DOM.querySelector('TruckData')

        if (!TruckData) {
            TruckData = DOM.createElement('TruckData')
            TruckAddon.appendChild(TruckData)
        }

        if (this.state.fuel && this.state.fuel !== '0') {
            TruckData.setAttribute('FuelCapacity', this.state.fuel)
        } else if (TruckData.getAttribute('FuelCapacity')) {
            TruckData.removeAttribute('FuelCapacity')
        }
        if (this.state.wheels && this.state.wheels !== '0') {
            TruckData.setAttribute('WheelRepairsCapacity', this.state.wheels)
        } else if (TruckData.getAttribute('WheelRepairsCapacity')) {
            TruckData.removeAttribute('WheelRepairsCapacity')
        }
        if (this.state.repairs && this.state.repairs !== '0') {
            TruckData.setAttribute('RepairsCapacity', this.state.repairs)
        } else if (TruckData.getAttribute('RepairsCapacity')) {
            TruckData.removeAttribute('RepairsCapacity')
        }

        if ((!this.state.fuel || this.state.fuel === '0') && (!this.state.wheels || this.state.wheels === '0') && (!this.state.repairs || this.state.repairs === '0') && TruckData.attributes.length === 0) {
            TruckData.remove()
        }

        saveFile(pathToAddon, new XMLSerializer().serializeToString(DOM).replace('<root>', '').replace('</root>', ''))
        alertSync(t.ADDON_CHANGED)
    }

    private getOptions(items: FindItem[]) {
        if (!items) return []
        return items.map(addon => {
            const name = this.getAddonName(addon)
            return (
                <MenuItem
                    key={addon.name}
                    value={addon.name}
                >
                    {name}
                </MenuItem>
            )
        })
    }

    private getAddonName(addon: FindItem) {
        const dom = this.getDOM(addon.path)
        const uiDesc = dom.querySelector('UiDesc')
        const key = uiDesc ? uiDesc.getAttribute('UiName') : null
        return getIngameText(key, this.props.modId) || addon.name
    }

    private getItem(name?: string) {
        if (!name) name = this.state.selectedAddon
        return this.state.items.filter(item => item.name === name)[0]
    }

    private getAddonData(path?: string) {
        const DOM = this.getDOM(path)
        if (!DOM) return {
            wheels: '',
            repairs: '',
            fuel: ''
        }

        const TruckAddon = DOM.querySelector('TruckAddon')
        let TruckData = TruckAddon.querySelector('TruckData')
        if (!TruckData) {
            TruckData = DOM.createElement('TruckData')
            TruckAddon.appendChild(TruckData)
        }

        const wheels = TruckData.getAttribute('WheelRepairsCapacity') || '0'
        const repairs = TruckData.getAttribute('RepairsCapacity') || '0'
        const fuel = TruckData.getAttribute('FuelCapacity') || '0'

        return {
            wheels: wheels,
            repairs: repairs,
            fuel: fuel
        }
    }

    private getDOM(path?: string) {
        if (!path) path = this.getItem().path
        if (!existsSync(path)) return
        const parser = new DOMParser()
        const data = readFile(path).toString()
        return parser.parseFromString(`<root>${data}</root>`, 'text/xml')
    }
}
