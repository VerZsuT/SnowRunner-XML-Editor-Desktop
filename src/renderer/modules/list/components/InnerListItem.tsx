import { PureComponent } from 'react'
import { getIngameText, mainProcess, prettify, t } from 'scripts'
import { IListContext, ListContext } from '../FilterContext'
import { ListType } from '../enums'

import { Loading } from 'modules/components/Loading'

import {
    Menu, MenuItem, Card as MuiCard, CardActionArea,
    CardMedia, CardContent, Typography, styled
} from '@mui/material'
import { StarRounded as StarRoundedIcon } from '@mui/icons-material'

const { exists } = window.listPreload
const { config, local } = window.provider
const { openEditor, readFile } = mainProcess

const Card = styled(MuiCard)({
    maxWidth: '250px',
    marginBottom: '10px'
})

const StarRounded = styled(StarRoundedIcon)({
    position: 'absolute',
    top: '5px',
    left: '5px'
})

interface IProps {
    item: Item
    type: ListType
    listId: string
}

interface IState {
    isDeleted: boolean
    isLoading: boolean
    contextMenu: {
        mouseX: number
        mouseY: number
    }
}

export class InnerListItem extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    private fileDOM: Document
    private name: string
    private hasError: boolean
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
        this.hasError = this.checkError()
        this.imgSrc = this.getImgSrc()
    }

    render() {
        const isShow = this.isShow()
        const isFavorite = config.favorites.includes(this.props.item.name)
        const text = this.getText()

        if (!this.hasError && isShow && !this.state.isDeleted) {
            return (<>
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
                        {isFavorite? t.REMOVE_FAVORITE : t.ADD_FAVORITE}
                    </MenuItem>
                </Menu>
                <Loading open={this.state.isLoading} />
            </>)
        } else {
            return null
        }
    }

    private openEditor = () => {
        local.set('filePath', this.props.item.path)
        local.set('currentDLC', this.props.item.dlcName)
        local.set('currentMod', this.props.item.modId)
        local.set('openedList', this.props.listId.replace('list-', ''))
        local.set('listScroll', String(Math.round(document.querySelector(`#${this.props.listId}`).scrollTop)))
        this.setState({
            isLoading: true
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
        this.setState({
            contextMenu: null
        })
    }

    private toggleFavorite = () => {
        this.onCloseContext()
        this.context.toggleFavorite(this.props.item.name)
    }

    private isShow = () => {
        const filter = this.context.filter
        if (!filter) {
            return true
        }
        if (this.name.toLowerCase().includes(filter.toLowerCase())) {
            return true
        }
        return false
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
        const data = `<root>${readFile(this.props.item.path)}</root>`
        return new DOMParser().parseFromString(data, 'text/xml')
    }

    private getText = () => {
        const filter = this.context.filter
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
            case ListType.trailers:
                try {
                    return require(`images/trailers/${this.props.item.name}.png`)
                } catch {
                    return require('images/trailers/default.png')
                }
            case ListType.trucks:
                try {
                    return require(`images/trucks/${this.props.item.name}.jpg`)
                } catch {
                    console.warn(`Не найдена картинка ${this.props.item.name}`)
                    const defaultImage = require('images/trucks/default.png')

                    if (this.props.item.modId && this.fileDOM.querySelector('GameData > UiDesc')) {
                        const imgName = this.fileDOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
                        const truckPath = `../../main/modsTemp/${this.props.item.modId}/ui/textures/${imgName}.png`
                        if (!exists(truckPath)) {
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
