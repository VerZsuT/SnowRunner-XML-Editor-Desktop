import { PureComponent } from 'react'

import { IMainContext, MainContext } from '../MainContext'

import Parameter from './Parameter'
import Group from './Group'

interface IProps {
    isExporting: boolean
}

export default class Parameters extends PureComponent<IProps> {
    static contextType = MainContext
    declare context: IMainContext

    render() {
        const { tableItems } = this.context

        return (
            <div id='parameters' className='accordion snow'>
                {tableItems.map(item => 
                    <div key={item.groupName? (item.groupName+item.name):(item.selector+item.name)}>
                        {item.paramType === 'group' && item.groupItems.length?
                            <Group
                                isExporting={this.props.isExporting}
                                isParentExport={true}
                                item={item}
                                parent='parameters'
                                tabs={1}
                                key={item.groupName}
                            />
                        :null}
                        {item.paramType !== 'group' && this.includes(item.text)?
                            <Parameter
                                isParentExport={true}
                                isExporting={this.props.isExporting}
                                item={item}
                                tabs={1}
                                key={item.name}
                            />
                        :null}
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
