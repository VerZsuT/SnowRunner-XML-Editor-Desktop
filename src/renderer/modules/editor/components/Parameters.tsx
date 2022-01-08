import { PureComponent } from 'react'
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
        const id = `parameters${this.props.postfix ?? ''}`

        return (
            <div id={id} className='accordion show'>
                {tableItems.map((item, index) =>
                    <div key={item.groupName ? `${item.groupName}-${index}` : `${item.selector}-${index}`}>
                        {item.paramType === 'group' && item.groupItems.length ?
                            <Group
                                isExporting={this.props.isExporting}
                                isParentExport={true}
                                item={item}
                                parent={id}
                                key={`${item.groupName}-${index}`}
                                regReset={this.props.regReset}
                            />
                            : null}
                        {item.paramType !== 'group' && this.includes(item.text) ?
                            <Parameter
                                isParentExport={true}
                                isExporting={this.props.isExporting}
                                item={item}
                                key={`${item.name}-${index}`}
                                regReset={this.props.regReset}
                            />
                            : null}
                    </div>
                )}
            </div>
        )
    }

    private includes(text: string) {
        const { filter } = this.context

        if (!filter) return true
        return text.toLowerCase().includes(filter)
    }
}
