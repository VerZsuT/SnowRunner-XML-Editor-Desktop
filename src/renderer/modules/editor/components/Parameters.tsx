import { Fragment, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { Parameter } from './Parameter'
import { Group } from './Group'

interface IProps {
    isExporting: boolean
    postfix?: string
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
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
                />
                : null}
            {item.paramType !== 'group' && this.includes(item.text) ?
                <Parameter
                    isParentExport={true}
                    isExporting={this.props.isExporting}
                    item={item}
                    regReset={this.props.regReset}
                />
            : null}
        </Fragment>)

        return items
    }

    private includes(text: string) {
        const { filter } = this.context

        if (!filter) return true
        return text.toLowerCase().includes(filter)
    }
}
