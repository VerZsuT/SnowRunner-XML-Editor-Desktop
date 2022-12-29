import type { ChangeEvent, ReactNode } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { pafcMemo, useRedux } from 'react-afc'
import { useActions } from 'react-afc/compatible'

import { selectFilter } from '../../store/filterSlice'
import { SEARCH } from '../texts'

import { actions } from '#pages/main/store'

function Search() {
  const store = useRedux({
    filter: selectFilter
  })

  function render(): ReactNode {
    return (
      <div className='search'>
        <Input
          placeholder={SEARCH}
          onChange={onChangeFilter}
          value={store.filter}
          bordered={false}
        />
        <SearchOutlined className='search-icon'/>
      </div>
    )
  }

  const { changeFilter } = useActions(actions)

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>): void {
    changeFilter(e.currentTarget.value)
  }

  return render
}

export default pafcMemo(Search)
