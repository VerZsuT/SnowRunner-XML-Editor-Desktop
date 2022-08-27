import {SearchOutlined} from '@ant-design/icons'
import {Input} from 'antd'
import type {MainDispatch} from 'pages/main/store'
import {afcMemo, getDispatcher, useRedux} from 'react-afc'

import {changeFilter, selectFilter} from '../../store/filterSlice'
import {listsTexts} from '../texts'

const { SEARCH } = listsTexts

export const Search = afcMemo(() => {
    const dispatch = getDispatcher<MainDispatch>()
    const reduxState = useRedux({
        filter: selectFilter
    })

    return () => (
        <div className='search'>
            <Input
                placeholder={SEARCH}
                onChange={e => dispatch(changeFilter(e.target.value))}
                value={reduxState.filter}
                bordered={false}
            />
            <SearchOutlined className='search-icon' />
        </div>
    )
})
