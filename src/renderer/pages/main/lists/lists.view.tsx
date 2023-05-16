import { ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { afcMemo } from 'react-afc'

import { List, Search } from './components'
import ListsController from './lists.controller'
import ListsModel from './lists.model'
import $ from './texts'

import { Category, GroupTab, SrcType } from '#g/enums'
import { updateOnLangChange } from '#g/texts/renderer'
import { Header, Menu } from '#r/components'
import { config } from '#r/services'

import './lists.styles'

const { settings } = config

function ListsView() {
  const model = new ListsModel()
  const ctrlr = new ListsController()

  const categories = updateOnLangChange<TabsProps['items']>(() => [
    {
      key: Category.trucks,
      label: <span>{$.TRUCKS_CATEGORY_TITLE}</span>
    },
    {
      key: Category.trailers,
      label: <span>{$.TRAILERS_CATEGORY_TITLE}</span>
    }
  ])

  const groups = updateOnLangChange<TabsProps['items']>(() => [
    {
      key: GroupTab.main,
      label:
        <span>
          <AppstoreOutlined className='tab-icon' />
          {$.MAIN_LIST_TITLE}
        </span>
    },
    {
      key: GroupTab.dlc,
      label:
        <span>
          <AppstoreAddOutlined className='tab-icon' />
          {$.DLC_LIST_TITLE}
        </span>,
      disabled: !settings.DLC
    },
    {
      key: GroupTab.mods,
      label:
        <span>
          <ApiOutlined className='tab-icon' />
          {$.MODS_LIST_TITLE}
        </span>,
      disabled: !settings.mods
    },
    {
      key: GroupTab.favorites,
      label:
        <span>
          <StarFilled className='tab-icon' />
          {$.FAVORITES_LIST_TITLE}
        </span>
    }
  ])

  return () => {
    const { category, group, items } = model
    const { dlc, mods, all, main } = items

    return <>
      <Menu />

      <Header
        text={category === Category.trucks ? $.TRUCKS_LIST_TITLE : $.TRAILERS_LIST_TITLE}
        extra={<Search />}
      />
      <Tabs
        className='tabs'
        activeKey={category}
        onChange={onChangeCategory}
        items={categories.val}
      />
      <Tabs
        className='tabs'
        activeKey={group}
        onChange={onChangeGroup}
        items={groups.val}
      />

      <List
        srcType={SrcType.main}
        items={main}
        opened={group === GroupTab.main}
      />
      <List
        srcType={SrcType.favorites}
        items={all}
        opened={group === GroupTab.favorites}
      />

      {settings.DLC &&
        <List
          srcType={SrcType.dlc}
          items={dlc}
          opened={group === GroupTab.dlc}
        />
      }
      {settings.mods &&
        <List
          srcType={SrcType.mods}
          items={mods}
          opened={group === GroupTab.mods}
        />
      }
    </>
  }

  function onChangeCategory(category: string): void {
    ctrlr.setCategory(category as Category)
  }

  function onChangeGroup(group: string): void {
    ctrlr.setGroup(group as GroupTab)
  }
}

export default afcMemo(ListsView)
