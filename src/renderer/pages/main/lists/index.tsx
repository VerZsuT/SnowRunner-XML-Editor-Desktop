import type { ReactNode } from 'react'

import { ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled } from '@ant-design/icons'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { pafcMemo, useMemo, useOnDraw, useRedux } from 'react-afc'
import { useActions } from 'react-afc/compatible'

import { actions } from '../store'
import { selectCategory, selectGroup } from '../store/listSlice'
import List from './components/List'
import Search from './components/Search'
import itemsService from './services/items'
import {
  DLC_LIST_TITLE,
  FAVORITES_LIST_TITLE,
  MAIN_LIST_TITLE,
  MODS_LIST_TITLE,
  TRAILERS_CATEGORY_TITLE,
  TRAILERS_LIST_TITLE,
  TRUCKS_CATEGORY_TITLE,
  TRUCKS_LIST_TITLE
} from './texts'

import Header from '#components/Header'
import Menu from '#components/Menu'
import { Category, GroupTab, ProgramWindow, SrcType } from '#enums'
import useIPCMessage from '#helpers/useIPCMessage'
import useKey from '#helpers/useKey'
import { config } from '#services'
import type { MPC } from '#types'

import './styles'

const bridge = Bridge.as<MPC>()
const { settings } = config

function Lists() {
  const categories: TabsProps['items'] = [
    {
      key: Category.trucks,
      label: <span>{TRUCKS_CATEGORY_TITLE}</span>
    },
    {
      key: Category.trailers,
      label: <span>{TRAILERS_CATEGORY_TITLE}</span>
    }
  ]

  const groups: TabsProps['items'] = [
    {
      key: GroupTab.main,
      label:
        <span>
          <AppstoreOutlined className='tab-icon'/>
          {MAIN_LIST_TITLE}
        </span>
    },
    {
      key: GroupTab.dlc,
      label:
        <span>
          <AppstoreAddOutlined className='tab-icon'/>
          {DLC_LIST_TITLE}
        </span>,
      disabled: !settings.DLC
    },
    {
      key: GroupTab.mods,
      label: 
        <span>
          <ApiOutlined className='tab-icon'/>
          {MODS_LIST_TITLE}
        </span>,
      disabled: !settings.mods
    },
    {
      key: GroupTab.favorites,
      label:
        <span>
          <StarFilled className='tab-icon'/>
          {FAVORITES_LIST_TITLE}
        </span>
    }
  ]

  const store = useRedux({
    category: selectCategory,
    group: selectGroup
  })

  useIPCMessage()
  useKey('Escape', () => bridge.quitApp())

  useOnDraw(() => {
    settings.showWhatsNew && openWhatsNew()
  })

  function render(): ReactNode {
    const { category, group } = store
    const { dlc, mods, all, main } = getItems()

    return <>
      <Menu/>

      <Header
        text={category === Category.trucks ? TRUCKS_LIST_TITLE : TRAILERS_LIST_TITLE}
        extra={<Search/>}
      />
      <Tabs
        className='tabs'
        activeKey={category}
        onChange={onChangeCategory}
        items={categories}
      />
      <Tabs
        className='tabs'
        activeKey={group}
        onChange={onChangeGroup}
        items={groups}
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

  const { setCategory, setGroup } = useActions(actions)

  function onChangeCategory(category: string): void {
    setCategory(category as Category)
  }

  function onChangeGroup(group: string): void {
    setGroup(group as GroupTab)
  }

  const getItems = useMemo(
    () => {
      const main = itemsService.getMain(store.category)
      const dlc = itemsService.getDLC(store.category)
      const mods = itemsService.getMods(store.category)
      const all = [...main, ...dlc, ...mods]
      return { main, dlc, mods, all }
    },
    () => [store.category]
  )

  function openWhatsNew(): void {
    if (settings.showWhatsNew) {
      void bridge.openWindow(ProgramWindow.WhatsNew)
      settings.showWhatsNew = false
    }
  }

  return render
}

export default pafcMemo(Lists)
