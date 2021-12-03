import { MouseEvent, PureComponent } from 'react'
import '../styles/InnerListItem.css'

import { getIngameText, mainProcess, prettify } from '@editor-service'
import { FilterContext } from '../FilterContext'

interface IProps {
    item: any
}

interface IState {
    isDeleted: boolean
}

export default class InnerListItem extends PureComponent<IProps, IState> {
    static contextType = FilterContext
    declare context: string

    private DOM = this.getDOM()
    private name = this.getName()
    private error = this.getError()
    private imgSrc = this.getImgSrc()
    private isMod: boolean

    state = {
        isDeleted: false
    }

    constructor(props: IProps) {
        super(props)
        this.isMod = Boolean(this.props.item.modId)
    }

    render() {
        const isShow = this.isShow()
        const text = this.getText()

        if (!this.error && isShow && !this.state.isDeleted) {
            const itemText = typeof text === 'string'
                ? <span className='item-text'>{text}</span>
                : <span className='item-text'>
                    {text.first}<span style={{color: 'red'}}>{text.second}</span>{text.last}
                  </span>
            return (
                <div className='item'>
                    {itemText}
                    <img src={this.imgSrc} onClick={this.openEditor}/>
                    {this.isMod?
                        <button className='delete-mod' onClick={this.delMod}>X</button> 
                    :null}
                </div>
            )
        } else {
            return null
        }
    }

    private openEditor = () => {
        local.set('filePath', this.props.item.path)
        local.set('currentDLC', this.props.item.dlcName)
        local.set('currentMod', this.props.item.modId)
        mainProcess.openEditor()
    }

    private isShow = () => {
        const filter = this.context
        if (!filter) {
            return true
        }
        if (this.name.toLowerCase().includes(filter.toLowerCase())) {
            return true
        }
        return false
    }

    private delMod = (event: MouseEvent) => {
        event.preventDefault()
        delete config.modsList[this.props.item.modId]
        listPreload.removeDir(listPreload.join(paths.modsTemp, this.props.item.modId))

        config.modsList.length--
        this.setState({
            isDeleted: true
        })
    }

    private getName() {
        let name = prettify(this.props.item.name)

        if (this.DOM.querySelector('GameData > UiDesc')) {
            const uiName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiName')
            if (uiName) {
                name = getIngameText(uiName, this.props.item.modId) || uiName
            }
        }
        return name
    }

    private getDOM() {
        const data = `<root>${mainProcess.readFile(this.props.item.path)}</root>`
        return new DOMParser().parseFromString(data, 'text/xml')
    }

    private getText = () => {
        const filter = this.context
        if (!filter) {
            return this.name
        }
        const firstIndex = this.name.toLowerCase().indexOf(filter.toLowerCase())
        const lastIndex = firstIndex + filter.length
        return {
            first: this.name.slice(0, firstIndex),
            second: this.name.slice(firstIndex, lastIndex),
            last: this.name.slice(lastIndex, this.name.length)
        }
    }

    private getError() {
        return Boolean(
            this.DOM.querySelector('parsererror') ||
            (
                this.props.item.type === 'trucks' &&
                this.DOM.querySelector('Truck') &&
                this.DOM.querySelector('Truck').getAttribute('Type') === 'Trailer'
            )
        )
    }

    private getImgSrc() {
        switch (local.get('listType')) {
            case 'cargo':
                return require('../../../../images/icons/cargo_item.png')
            case 'trailers':
                try {
                    return require(`../../../../images/trailers/${this.props.item.name}.png`)
                } catch {
                    return require('../../../../images/icons/trailer_item.png')
                }
            case 'trucks':
                try {
                    return require(`../../../../images/trucks/${this.props.item.name}.jpg`)
                } catch {
                    const defaultImage = require('../../../../images/icons/truck_item.png')

                    if (this.props.item.modId && this.DOM.querySelector('GameData > UiDesc')) {
                        const imgName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
                        const truckPath = `../../main/modsTemp/${this.props.item.modId}/ui/textures/${imgName}.png`
                        if (!listPreload.exists(truckPath)) {
                            return defaultImage
                        } else {
                            return truckPath
                        }
                    } else {
                        return defaultImage
                    }
                }
        }
    }
}
