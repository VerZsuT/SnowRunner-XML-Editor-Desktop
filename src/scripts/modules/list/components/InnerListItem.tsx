import { MouseEvent, PureComponent } from 'react'
import '../styles/InnerListItem'

import { getIngameText, mainProcess, prettify } from '@sxmle-service'
import { FilterContext } from '../FilterContext'
import { ListType } from '../enums'

interface IProps {
    item: Item
    type: ListType
}

interface IState {
    isDeleted: boolean
}

export default class InnerListItem extends PureComponent<IProps, IState> {
    static contextType = FilterContext
    declare context: string

    private fileDOM: Document
    private name: string
    private hasError: boolean
    private imgSrc: string
    private isMod: boolean

    constructor(props: IProps) {
        super(props)

        this.state = {
            isDeleted: false
        }
        this.isMod = Boolean(this.props.item.modId)
        this.fileDOM = this.getDOM()
        this.name = this.getName()
        this.hasError = this.checkError()
        this.imgSrc = this.getImgSrc()
    }

    render() {
        const isShow = this.isShow()
        const text = this.getText()

        if (!this.hasError && isShow && !this.state.isDeleted) {
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

        if (this.fileDOM.querySelector('GameData > UiDesc')) {
            const uiName = this.fileDOM.querySelector('GameData > UiDesc').getAttribute('UiName')
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

    private checkError() {
        return Boolean(
            this.fileDOM.querySelector('parsererror') ||
            (
                this.props.type === ListType.trucks &&
                this.fileDOM.querySelector('Truck') &&
                this.fileDOM.querySelector('Truck').getAttribute('Type') === 'Trailer'
            )
        )
    }

    private getImgSrc() {
        switch (this.props.type) {
            case ListType.cargo:
                return require('@sxmle-images/cargo/default.png')
            case ListType.trailers:
                try {
                    return require(`@sxmle-images/trailers/${this.props.item.name}.png`)
                } catch {
                    return require('@sxmle-images/trailers/default.png')
                }
            case ListType.trucks:
                try {
                    return require(`@sxmle-images/trucks/${this.props.item.name}.jpg`)
                } catch {
                    console.warn(`Не найдена картинка ${this.props.item.name}`)
                    const defaultImage = require('@sxmle-images/trucks/default.png')

                    if (this.props.item.modId && this.fileDOM.querySelector('GameData > UiDesc')) {
                        const imgName = this.fileDOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
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
