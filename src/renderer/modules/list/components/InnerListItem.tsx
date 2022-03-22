import { PureComponent } from 'react'
import { load } from 'cheerio'
import type { CSSProperties } from 'react'
import type { CheerioAPI } from 'cheerio'
import type IItem from '../types/IItem'
import ListType from '../enums/ListType'

import { getIngameText, prettify } from 'scripts/funcs'
import { IListContext, ListContext } from '../FilterContext'
import localize from 'scripts/localize'
import config from 'scripts/config'
import local from 'scripts/storage'
import main from 'scripts/main'
import { getExported } from 'scripts/dom'
import { showLoading } from 'modules/components/Loading'
import { showAlert } from 'modules/components/Alert'

import {
    Menu, MenuItem, CardActionArea,
    CardMedia, CardContent, Typography
} from '@mui/material'
import Card from '../styled/Card'
import StarRounded from '../styled/StarRounded'

const { existsSync, readFileSync, writeFileSync } = window.service
const { openEditor, openSaveDialog } = main

interface IProps {
    item: IItem
    type: ListType
    listId: string
    modId: string
    dlc: string
}

interface IState {
    contextMenu: {
        mouseX: number
        mouseY: number
    }
}

export default class InnerListItem extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    private styles = {
        cardContent: { padding: '5px' },
        text: {
            textAlign: 'center',
            fontSize: '1.1rem'
        } as CSSProperties,
        red: { color: 'red' }
    }
    private fileDOM: CheerioAPI
    private name: string
    private imgSrc: string

    constructor(props: IProps) {
        super(props)
        this.state = { contextMenu: null }
        this.fileDOM = this.getDOM()
        this.name = this.getName()
        this.imgSrc = this.getImgSrc()
    }

    render() {
        const { item } = this.props
        const { contextMenu } = this.state

        const isShow = this.isShow()
        const isFavorite = config.favorites.includes(item.name)
        const text = this.getText()

        if (!isShow)
            return null

        return <>
            <Card onContextMenu={this.onContextMenu}>
                <CardActionArea onClick={this.openEditor}>
                    <CardMedia
                        component='img'
                        height='350px'
                        image={this.imgSrc}
                    />
                    {isFavorite ?
                        <StarRounded htmlColor='yellow'/>
                    : null}
                    <CardContent style={this.styles.cardContent}>
                        <Typography
                            component='div'
                            style={this.styles.text}
                        >
                            {typeof text === 'string'
                                ? text
                                : <>
                                    {text.first}
                                    <span style={this.styles.red}>
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
                open={contextMenu !== null}
                onClose={this.onCloseContext}
                anchorReference='anchorPosition'
                anchorPosition={
                contextMenu !== null
                    ? {
                        top: contextMenu.mouseY,
                        left: contextMenu.mouseX
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
        </>
    }

    private export = () => {
        const { item, modId, dlc } = this.props

        const exported = getExported(item.path, false, modId, dlc)
        const path = openSaveDialog(item.name)

        this.onCloseContext()
        if (!path)
            return

        writeFileSync(path, JSON.stringify(exported, null, '\t'))
        showAlert({ text: localize.SUCCESS_EXPORT_MESSAGE })
    }

    private openEditor = () => {
        const { item, listId } = this.props

        local.set('filePath', item.path)
        local.set('currentDLC', item.dlcName)
        local.set('currentMod', item.modId)
        local.set('openedList', listId.replace('list-', ''))
        local.set('listScroll', String(Math.round(document.querySelector(`#${listId}`).scrollTop)))

        this.setState({ contextMenu: null })
        showLoading()
        openEditor()
    }

    private onContextMenu = (event: React.MouseEvent) => {
        const { contextMenu } = this.state

        event.preventDefault()
        this.setState({
            contextMenu: contextMenu === null ? {
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
        const { item } = this.props

        let name = prettify(item.name)

        if (this.fileDOM('GameData > UiDesc').length) {
            const uiName = this.fileDOM('GameData > UiDesc').attr('UiName')
            if (uiName)
                name = getIngameText(uiName, item.modId) || uiName
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
        const { type, item } = this.props

        switch (type) {
            case ListType.trailers:
                try {
                    return require(`images/trailers/${item.name}.png`)
                }
                catch {
                    return require('images/trailers/default.png')
                }
            case ListType.trucks:
                try {
                    return require(`images/trucks/${item.name}.jpg`)
                }
                catch {
                    const defaultImage = require('images/trucks/default.png')
                    // MARK: Картинки
                    // console.warn(`Не найдена картинка ${this.props.item.name}`)
                    if (item.modId && this.fileDOM('GameData > UiDesc').length) {
                        const imgName = this.fileDOM('GameData > UiDesc').attr('UiIcon328x458')
                        const truckPath = `../../main/modsTemp/${item.modId}/ui/textures/${imgName}.png`

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
