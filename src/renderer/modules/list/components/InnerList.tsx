import { PureComponent, ReactNode } from 'react'
import { mainProcess, t } from 'scripts'
import { InnerListItem } from './InnerListItem'
import { IListContext, ListContext } from '../FilterContext'
import { ListType, SrcType } from '../enums'
import { ModsPopup } from './ModsPopup'

import {
    Grid,
    Container,
    Button,
    GridProps,
    styled
} from '@mui/material'
import { Confirm } from 'modules/components/Confirm'
import { CommonProps } from '@mui/material/OverridableComponent'

const { reload } = mainProcess
const { config, local } = window.provider

const ListContainer = styled((props: GridProps & CommonProps & {children: ReactNode}) =>
    <Grid container {...props}/>
)({
    marginTop: '145px',
    justifyContent: 'space-evenly'
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

    constructor(props: IProps) {
        super(props)

        this.state = {
            showModsPopup: false,
            showConfirm: false
        }
    }

    render() {
        const listType = local.get('listType') as ListType
        const items = this.props.items.map(item =>
            <InnerListItem
                item={item}
                type={listType}
                key={item.path}
            />
        )

        if (this.props.srcType === SrcType.mods && !config.settings.mods) return null
        if (this.props.srcType === SrcType.dlc && !config.settings.DLC) return null

        return (<>
            <ListContainer
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
