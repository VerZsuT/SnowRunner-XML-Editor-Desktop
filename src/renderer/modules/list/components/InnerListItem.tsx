import { PureComponent } from 'react'
import { load } from 'cheerio'
import type { CheerioAPI } from 'cheerio'
import type IItem from '../types/IItem'
import ListType from '../enums/ListType'

import { getIngameText, prettify } from 'scripts/funcs'
import { IListContext, ListContext } from '../FilterContext'
import localize from 'scripts/localize'
import config from 'scripts/config'
import local from 'scripts/storage'
import main from 'scripts/main'
import Loading from 'modules/components/Loading'

import {
    Menu, MenuItem, CardActionArea,
    CardMedia, CardContent, Typography
} from '@mui/material'
import Card from '../styled/Card'
import StarRounded from '../styled/StarRounded'
import { getExported } from 'scripts/dom'

const { existsSync, readFileSync, writeFileSync } = window.service
const { openEditor, openSaveDialog } = main
const { on } = window.ipc

interface IProps {
    item: IItem
    type: ListType
    listId: string
    modId: string
    dlc: string
}

interface IState {
    isDeleted: boolean
    isLoading: boolean
    contextMenu: {
        mouseX: number
        mouseY: number
    }
}

export default class InnerListItem extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    private fileDOM: CheerioAPI
    private name: string
    private imgSrc: string

    constructor(props: IProps) {
        super(props)
        this.state = {
            isDeleted: false,
            isLoading: false,
            contextMenu: null
        }
        this.fileDOM = this.getDOM()
        this.name = this.getName()
        this.imgSrc = this.getImgSrc()

        on('close-editor', () => this.setState({ isLoading: false }))
    }

    render() {
        const isShow = this.isShow()
        const isFavorite = config.favorites.includes(this.props.item.name)
        const text = this.getText()

        if (isShow && !this.state.isDeleted) {
            return (<>
                <Card onContextMenu={this.onContextMenu}>
                    <CardActionArea onClick={() => this.openEditor()}>
                        <CardMedia
                            component='img'
                            height='350px'
                            image={this.imgSrc}
                        />
                        {isFavorite ?
                            <StarRounded htmlColor='yellow'/>
                        : null}
                        <CardContent style={{ padding: '5px' }}>
                            <Typography
                                component='div'
                                style={{ textAlign: 'center', fontSize: '1.1rem' }}
                            >
                                {typeof text === 'string'
                                    ? text
                                    : <>
                                        {text.first}
                                        <span style={{ color: 'red' }}>
                                            {text.second}
                                        </span>
                                        {text.last}
                                      </>
                                }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Menu
                    open={this.state.contextMenu !== null}
                    onClose={this.onCloseContext}
                    anchorReference='anchorPosition'
                    anchorPosition={
                    this.state.contextMenu !== null
                        ? {
                            top: this.state.contextMenu.mouseY,
                            left: this.state.contextMenu.mouseX
                        }
                        : undefined
                    }
                >
                    <MenuItem onClick={this.toggleFavorite}>
                        {isFavorite? localize.REMOVE_FAVORITE : localize.ADD_FAVORITE}
                    </MenuItem>
                    <MenuItem onClick={this.export}>
                        {localize.EXPORT}
                    </MenuItem>
                </Menu>
                <Loading show={this.state.isLoading} />
            </>)
        }
        else {
            return null
        }
    }

    private export = () => {
        const exported = getExported(this.props.item.path, false, this.props.modId, this.props.dlc)
        const path = openSaveDialog(this.props.item.name)

        this.onCloseContext()
        if (!path)
            return

        writeFileSync(path, JSON.stringify(exported, null, '\t'))
    }

    private openEditor = () => {
        local.set('filePath', this.props.item.path)
        local.set('currentDLC', this.props.item.dlcName)
        local.set('currentMod', this.props.item.modId)
        local.set('openedList', this.props.listId.replace('list-', ''))
        local.set('listScroll', String(Math.round(document.querySelector(`#${this.props.listId}`).scrollTop)))

        this.setState({
            isLoading: true,
            contextMenu: null
        })
        openEditor()
    }

    private onContextMenu = (event: React.MouseEvent) => {
        event.preventDefault()
        this.setState({
            contextMenu: this.state.contextMenu === null ? {
                mouseX: event.clientX - 2,
                mouseY: event.clientY - 4,
            } : null
        })
    }

    private onCloseContext = () => {
        this.setState({ contextMenu: null })
    }

    private toggleFavorite = () => {
        this.onCloseContext()
        this.context.toggleFavorite(this.props.item.name)
    }

    private isShow = () => {
        const filter = this.context.filter

        if (!filter)
            return true

        if (this.name.toLowerCase().includes(filter.toLowerCase()))
            return true
        
        return false
    }

    private getName() {
        let name = prettify(this.props.item.name)

        if (this.fileDOM('GameData > UiDesc').length) {
            const uiName = this.fileDOM('GameData > UiDesc').attr('UiName')
            if (uiName)
                name = getIngameText(uiName, this.props.item.modId) || uiName
        }
        return name
    }

    private getDOM() {
        return load(readFileSync(this.props.item.path), { xmlMode: true })
    }

    private getText = () => {
        const filter = this.context.filter
        let firstIndex: number
        let lastIndex: number

        if (!filter)
            return this.name
        
        firstIndex = this.name.toLowerCase().indexOf(filter.toLowerCase())
        lastIndex = firstIndex + filter.length

        return {
            first: this.name.slice(0, firstIndex),
            second: this.name.slice(firstIndex, lastIndex),
            last: this.name.slice(lastIndex, this.name.length)
        }
    }

    private getImgSrc() {
        switch (this.props.type) {
            case ListType.trailers:
                try {
                    return require(`images/trailers/${this.props.item.name}.png`)
                }
                catch {
                    return require('images/trailers/default.png')
                }
            case ListType.trucks:
                try {
                    return require(`images/trucks/${this.props.item.name}.jpg`)
                }
                catch {
                    const defaultImage = require('images/trucks/default.png')
                    // MARK: Картинки
                    // console.warn(`Не найдена картинка ${this.props.item.name}`)
                    if (this.props.item.modId && this.fileDOM('GameData > UiDesc').length) {
                        const imgName = this.fileDOM('GameData > UiDesc').attr('UiIcon328x458')
                        const truckPath = `../../main/modsTemp/${this.props.item.modId}/ui/textures/${imgName}.png`

                        if (!existsSync(truckPath))
                            return defaultImage
                        else
                            return truckPath
                    }
                    else {
                        return defaultImage
                    }
                }
        }
    }
}
