import type { ChangeEvent } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { pafcMemo, useActions, useRedux } from 'react-afc'

import { selectFilter } from '../../store/filterSlice'
import $ from '../texts'

import { actions } from '#pages/main/store'

function Search() {
  const store = useRedux({
    filter: selectFilter
  })

  const { changeFilter } = useActions(actions)

  return () => (
    <div className='search'>
      <Input
        placeholder={$.SEARCH}
        onChange={onChangeFilter}
        value={store.filter}
        bordered={false}
      />
      <SearchOutlined className='search-icon'/>
    </div>
  )

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>): void {
    changeFilter(e.currentTarget.value)
  }
}

export default pafcMemo(Search)
