import { ChangeEvent, PureComponent } from 'react'

import { t } from '@sxmle-service'
import { IMainContext, MainContext } from '../MainContext'

interface IProps {
    value: string
    onChange: (newFilter: string) => void
}

export default class Search extends PureComponent<IProps> {
    static contextType = MainContext
    declare context: IMainContext

    render() {
        return (
            <div className='search'>
                <label htmlFor='search' className='form-label'>{t.SEARCH}:</label>
                <input
                    type='text'
                    id='search'
                    className='form-control'
                    v-model='value'
                    value={this.props.value}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    private onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value)
    }
}
