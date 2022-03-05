import type { CheerioAPI } from 'cheerio'
import type IFindItem from 'modules/list/types/IFindItem'
import type IActionData from '../types/IActionData'
import type IActionProps from '../types/IActionProps'
import main from 'scripts/main'

import ActionBase from './ActionBase'
import { Button, MenuItem, Select } from '@mui/material'

const { join } = window.service
const { paths, findInDir } = main

const texts = {
    RU: {
        name: 'Наборы колёс',
        add: 'Добавить'
    },
    EN: {
        name: 'Sets of wheels',
        add: 'Add'
    },
    DE: {
        name: 'Radsätze',
        add: 'Hinzufügen'
    }
}[main.config.lang]

interface IState {
    items: IFindItem[]
    selected: string
}

export const data: IActionData = {
    name: texts.name,
    id: 'wheels',
    minHeight: 100,
    imgSRC: require('images/icons/editor/wheels.png'),
    isActive: dom => !!dom('CompatibleWheels').length
}

export default class Wheels extends ActionBase<IState> {
    constructor(props: IActionProps) {
        super(props, data, Wheels)
        this.state = {
            items: [],
            selected: ''
        }
    }

    public componentDidMount(): void {
        const items = this.getItems()
        this.setState({
            items: items,
            selected: items.length? items[0].name : ''
        })
    }

    public render() {
        return <>
            <Select
                value={this.state.selected}
                onChange={e => this.setState({ selected: e.target.value })}
            >
                {this.state.items.map(item => 
                    <MenuItem key={item.path} value={item.name}>
                        {item.name}
                    </MenuItem>
                )}
            </Select>
            <Button onClick={() => this.onSelect(this.state.selected)}>
                {texts.add}
            </Button>
        </>
    }

    private onSelect = async (selected: string) => {
        this.addWheels(this.props.dom, selected)
        this.save(true)
    }


    private addWheels(dom: CheerioAPI, name: string) {
        dom('CompatibleWheels').last().after(`\n\t\t<CompatibleWheels Scale="0.6" Type="${name}"/>`)
    }

    private getItems() {
        const out: IFindItem[] = []
        const fonded = findInDir(join(paths.classes, 'wheels'))

        for (const item of fonded) {
            if (!this.props.dom(`CompatibleWheels[Type="${item.name}"]`).length)
                out.push(item)
        }
        return out
    }
}
