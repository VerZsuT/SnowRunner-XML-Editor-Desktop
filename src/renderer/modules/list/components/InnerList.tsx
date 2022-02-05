import { PureComponent } from 'react'
import { mainProcess, t } from 'scripts'
import { InnerListItem } from './InnerListItem'
import { IListContext, ListContext } from '../FilterContext'
import { ListType, SrcType } from '../enums'
import { ModsPopup } from './ModsPopup'

import { Button, styled } from '@mui/material'
import { Confirm } from 'modules/components/Confirm'
import { Container, GridContainer } from 'modules/components/styled'

const { reload } = mainProcess
const { config, local } = window.provider

const ListContainer = styled(GridContainer)({
    marginTop: '145px',
    justifyContent: 'space-evenly',
    overflow: 'auto',
    height: 'calc(100vh - 145px)'
})

interface IProps {
    srcType: SrcType
    items: Item[]
    opened?: boolean
}

interface IState {
    showModsPopup: boolean
    showConfirm: boolean
}

export class InnerList extends PureComponent<IProps, IState> {
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
        if (this.props.opened === false) return null
        
        const listType = local.get('listType') as ListType
        const items = this.props.items.map(item =>
            <InnerListItem
                item={item}
                type={listType}
                key={item.path}
                listId={this.id}
            />
        )

        if (this.props.srcType === SrcType.mods && !config.settings.mods) return null
        if (this.props.srcType === SrcType.dlc && !config.settings.DLC) return null

        return (<>
            <ListContainer
                id={this.id}
                style={{
                    display: this.props.opened ? 'flex' : 'none'
                }}
            >
                {this.props.srcType === SrcType.mods ? <>
                    <Container style={{ textAlign: 'center' }}>
                        <Button
                            className='not-upper'
                            variant='contained'
                            onClick={this.showModsPopup}
                            style={{ marginBottom: '10px' }}
                        >
                            {t.MODS_CHANGE_BUTTON}
                        </Button>
                    </Container>
                    <ModsPopup
                        show={this.state.showModsPopup}
                        hidePopup={this.hideModsPopup}
                    />
                    <Confirm
                        text={t.RELAUNCH_PROMPT}
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
        this.setState({
            showModsPopup: false
        })
        if (isReload) {
            setTimeout(() => {
                this.showReloadConfirm()
            }, 500)
        }
    }

    private showModsPopup = () => {
        this.setState({
            showModsPopup: true
        })
    }

    private showReloadConfirm = () => {
        this.setState({
            showConfirm: true
        })
    }

    private hideReloadConfirm = () => {
        this.setState({
            showConfirm: false
        })
    }
}
