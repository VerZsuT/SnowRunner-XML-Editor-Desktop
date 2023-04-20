import type { ChangeEvent } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../../texts'
import SearchController from './search.controller'
import SearchModel from './search.model'

function SearchView() {
  const model = new SearchModel()
  const ctrlr = new SearchController()

  return () => (
    <div className='search'>
      <Input
        placeholder={$.SEARCH}
        onChange={onInput}
        value={model.filter}
        bordered={false}
      />
      <SearchOutlined className='search-icon' />
    </div>
  )

  function onInput(e: ChangeEvent<HTMLInputElement>): void {
    ctrlr.changeFilter(e.currentTarget.value)
  }
}

export default afcMemo(SearchView)
