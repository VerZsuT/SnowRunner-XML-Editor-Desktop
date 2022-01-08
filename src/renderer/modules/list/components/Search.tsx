import { ChangeEvent, PureComponent } from 'react'
import { t } from 'scripts'

interface IProps {
    value: string
    onChange(value: string): void
}

export class Search extends PureComponent<IProps> {
    render() {
        return (
            <div className='search'>
                <label htmlFor='search' className='form-label'>{t.SEARCH}:</label>
                <input
                    type='text'
                    id='search'
                    className='form-control'
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
