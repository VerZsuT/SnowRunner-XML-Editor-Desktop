import { Fragment, PureComponent } from 'react'
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
        const items = tableItems.map((item, index) => <Fragment key={index}>
            {item.paramType === 'group' && item.groupItems.length ?
                <Group
                    item={item}
                    regReset={this.props.regReset}
                    unregReset={this.props.unregReset}
                    toggle={(expand: boolean) => this.setState({ openedGroup: expand? index : null })}
                    isExporting={this.props.isExporting}
                    isParentExport={true}
                    isShow={this.props.isShow}
                    isOpen={this.state.openedGroup === index}
                />
                : null}
            {item.paramType !== 'group' ?
                <Parameter
                    item={item}
                    regReset={this.props.regReset}
                    unregReset={this.props.unregReset}
                    isParentExport={true}
                    isExporting={this.props.isExporting}
                    isShow={this.props.isShow}
                />
            : null}
        </Fragment>)

        return items
    }
}
