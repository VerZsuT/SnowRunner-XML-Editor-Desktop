import { PureComponent } from 'react'
import type { CSSProperties } from 'react'
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
import Confirm, { showConfirm } from 'modules/components/Confirm'

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
}

export default class InnerList extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    private styles = {
        button: { marginBottom: '10px' },
        cont: { textAlign: 'center' } as CSSProperties
    }
    private id: string

    constructor(props: IProps) {
        super(props)
        this.state = { showModsPopup: false }
        this.id = `list-${props.srcType}`
    }

    render() {
        const { opened, items: propItems, srcType } = this.props

        if (opened === false)
            return null
        
        const listType = local.get('listType') as ListType
        const items = propItems.map(item =>
            <InnerListItem
                item={item}
                type={listType}
                key={item.path}
                listId={this.id}
                modId={item.modId}
                dlc={item.dlcName}
            />
        )

        if (srcType === SrcType.mods && !config.settings.mods)
            return null
        if (srcType === SrcType.dlc && !config.settings.DLC)
            return null

        return <>
            <ListContainer id={this.id}>
                {this.props.srcType === SrcType.mods ? <>
                    <Container style={this.styles.cont}>
                        <Button
                            className='not-upper'
                            variant='contained'
                            onClick={this.showModsPopup}
                            style={this.styles.button}
                        >
                            {localize.MODS_CHANGE_BUTTON}
                        </Button>
                    </Container>
                    <ModsPopup
                        show={this.state.showModsPopup}
                        hidePopup={this.hideModsPopup}
                    />
                    <Confirm/>
                </> : null}
                {items}
            </ListContainer>
        </>
    }

    private hideModsPopup = (isReload?: boolean) => {
        this.setState({ showModsPopup: false })
        if (isReload) {
            setTimeout(() => {
                showConfirm({
                    text: localize.RELAUNCH_PROMPT,
                    onSuccess: reload
                })
            }, 500)
        }
    }

    private showModsPopup = () => {
        this.setState({ showModsPopup: true })
    }
}
