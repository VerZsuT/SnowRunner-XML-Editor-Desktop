import { PureComponent } from 'react'
import '../styles/Category'

import { mainProcess, t } from '@sxmle-service'
import { ListType } from '../../list/enums'

interface IProps {
    name: ListType
}

export default class Category extends PureComponent<IProps> {
    private imgSrc: string

    constructor(props: IProps) {
        super(props)
        this.imgSrc = require(`../../../../images/category/${this.props.name}_category.png`)
    }

    render() {
        return (
            <div className='category' onClick={this.openList}>
                <img src={this.imgSrc}/>
                <span className='category-name'>
                    {t[`${this.props.name.toUpperCase()}_CATEGORY_TITLE`]}
                </span>
            </div>
        )
    }

    private openList = () => {
        local.set('listType', this.props.name)
        mainProcess.openList()
    }
}
