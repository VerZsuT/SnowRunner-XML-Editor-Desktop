import { PureComponent } from 'react'
import type IItem from '../types/IItem'
import ListType from '../enums/ListType'
import SrcType from '../enums/SrcType'
import localize from 'scripts/localize'
import config from 'scripts/config'
import local from 'scripts/storage'
import main from 'scripts/main'

import { IListContext, ListContext } from '../FilterContext'
import InnerListItem from './InnerListItem'
import ModsPopup from './ModsPopup'
import Confirm from 'modules/components/Confirm'

import { Button } from '@mui/material'
import Container from 'modules/components/styled/Container'
import ListContainer from '../styled/ListContainer'

const { reload } = main

interface IProps {
    srcType: SrcType
    items: IItem[]
    opened?: boolean
}

interface IState {
    showModsPopup: boolean
    showConfirm: boolean
}

export default class InnerList extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    private id: string

    constructor(props: IProps) {
        super(props)

        this.state = {
            showModsPopup: false,
            showConfirm: false
        }
        this.id = `list-${props.srcType}`
    }

    render() {
        if (this.props.opened === false) {
            return null
        }
        
        const listType = local.get('listType') as ListType
        const items = this.props.items.map(item =>
            <InnerListItem
                item={item}
                type={listType}
                key={item.path}
                listId={this.id}
                modId={item.modId}
                dlc={item.dlcName}
            />
        )

        if (this.props.srcType === SrcType.mods && !config.settings.mods)
            return null
        if (this.props.srcType === SrcType.dlc && !config.settings.DLC)
            return null

        return (<>
            <ListContainer
                id={this.id}
                style={{ display: this.props.opened ? 'flex' : 'none' }}
            >
                {this.props.srcType === SrcType.mods ? <>
                    <Container style={{ textAlign: 'center' }}>
                        <Button
                            className='not-upper'
                            variant='contained'
                            onClick={this.showModsPopup}
                            style={{ marginBottom: '10px' }}
                        >
                            {localize.MODS_CHANGE_BUTTON}
                        </Button>
                    </Container>
                    <ModsPopup
                        show={this.state.showModsPopup}
                        hidePopup={this.hideModsPopup}
                    />
                    <Confirm
                        text={localize.RELAUNCH_PROMPT}
                        open={this.state.showConfirm}
                        onSuccess={() => reload()}
                        onClose={this.hideReloadConfirm}
                    />
                </> : null}
                {items}
            </ListContainer>
        </>)
    }

    private hideModsPopup = (isReload?: boolean) => {
        this.setState({ showModsPopup: false })
        if (isReload) {
            setTimeout(() => {
                this.showReloadConfirm()
            }, 500)
        }
    }

    private showModsPopup = () => {
        this.setState({ showModsPopup: true })
    }

    private showReloadConfirm = () => {
        this.setState({ showConfirm: true })
    }

    private hideReloadConfirm = () => {
        this.setState({ showConfirm: false })
    }
}
