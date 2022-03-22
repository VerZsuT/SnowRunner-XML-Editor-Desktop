import { Fragment, PureComponent } from 'react'
import memoizee from 'memoizee'
import { IMainContext, MainContext } from '../MainContext'

import Parameter from './Parameter'
import Group from './Group'

interface IProps {
    isExporting: boolean
    postfix?: string
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

interface IState {
    openedGroup: number
}

export default class Parameters extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    constructor(props: IProps) {
        super(props)
        this.state = {
            openedGroup: null
        }
    }

    render() {
        const { tableItems } = this.context
        const { regReset, unregReset, isExporting, isShow } = this.props
        const { openedGroup } = this.state

        const items = tableItems.map((item, index) => <Fragment key={index}>
            {item.paramType === 'group' && item.groupItems.length ?
                <Group
                    item={item}
                    regReset={regReset}
                    unregReset={unregReset}
                    toggle={this.toggleExpand(index)}
                    isExporting={isExporting}
                    isParentExport={true}
                    isShow={isShow}
                    isOpen={openedGroup === index}
                />
                : null}
            {item.paramType !== 'group' ?
                <Parameter
                    item={item}
                    regReset={regReset}
                    unregReset={unregReset}
                    isParentExport={true}
                    isExporting={isExporting}
                    isShow={isShow}
                />
            : null}
        </Fragment>)

        return items
    }

    private toggleExpand = memoizee((index: number) => (expand: boolean) => this.setState({ openedGroup: expand? index : null }))
}
