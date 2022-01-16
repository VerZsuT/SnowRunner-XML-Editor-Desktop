import { Fragment, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { Parameter } from './Parameter'
import { Group } from './Group'

interface IProps {
    isExporting: boolean
    postfix?: string
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

export class Parameters extends PureComponent<IProps> {
    static contextType = MainContext
    declare context: IMainContext

    render() {
        const { tableItems } = this.context
        const items = tableItems.map((item, index) => <Fragment key={index}>
            {item.paramType === 'group' && item.groupItems.length ?
                <Group
                    isExporting={this.props.isExporting}
                    isParentExport={true}
                    item={item}
                    regReset={this.props.regReset}
                    isShow={this.props.isShow}
                />
                : null}
            {item.paramType !== 'group' ?
                <Parameter
                    isParentExport={true}
                    isExporting={this.props.isExporting}
                    item={item}
                    regReset={this.props.regReset}
                    isShow={this.props.isShow}
                />
            : null}
        </Fragment>)

        return items
    }
}
