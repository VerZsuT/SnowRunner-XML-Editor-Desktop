import { PureComponent } from 'react'
import { mainProcess, t } from 'scripts'
import { InnerListItem } from './InnerListItem'
import { IListContext, ListContext } from '../FilterContext'
import { ListType, SrcType } from '../enums'
import { ModsPopup } from './ModsPopup'

const { confirm, reload } = mainProcess
const { config, local } = window.provider

interface IProps {
    srcType: SrcType
    items: Item[]
    opened?: boolean
}

interface IState {
    showModsPopup: boolean
}

export class InnerList extends PureComponent<IProps, IState> {
    static contextType = ListContext
    declare context: IListContext

    constructor(props: IProps) {
        super(props)

        this.state = {
            showModsPopup: false
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
        const opened = Boolean(this.context.filter) || (this.props.opened ?? false)

        if (this.props.srcType === SrcType.mods && !config.settings.mods) return null
        if (this.props.srcType === SrcType.dlc && !config.settings.DLC) return null

        return (<>
            <div
                className={`list accordion-collapse collapse${opened ? ' show' : ''}`}
            >
                {this.props.srcType === SrcType.mods ? <>
                    <div className='add-mod'>
                        <button
                            className='btn btn-primary'
                            onClick={this.showPopup}
                        >
                            {t.MODS_CHANGE_BUTTON}
                        </button>
                    </div>
                    <ModsPopup show={this.state.showModsPopup} hidePopup={this.hidePopup} />
                </> : null}
                {items}
            </div>
        </>)
    }

    

    private hidePopup = (isReload?: boolean) => {
        this.setState({
            showModsPopup: false
        })
        if (isReload) {
            setTimeout(() => {
                if (confirm(t.RELAUNCH_PROMPT)) {
                    reload()
                }
            }, 500)
        }
    }

    private showPopup = () => {
        this.setState({
            showModsPopup: true
        })
    }
}
