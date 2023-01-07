import { Button, Modal, Spin, Transfer } from 'antd'
import { afcMemo, useOnRender, useReactive } from 'react-afc'

import mods from '../services/mods'
import $ from '../texts'

import { config } from '#services'
import type { IFindItem } from '#types'

type Props = {
  show: boolean
  hidePopup(reload?: boolean): void
}

function ModsPopup(props: Props) {
  const titles = ['Found', 'Added']

  const state = useReactive({
    items: undefined as IFindItem[] | undefined,
    targetKeys: [] as string[],
    selectedKeys: [] as string[]
  })

  useOnRender(loadMods)

  return () => {
    const { show } = props
    const { items, targetKeys, selectedKeys } = state

    return (
      <Modal
        title={items ? $.MODS_POPUP_TITLE : $.LOADING}
        onCancel={onHidePopup}
        onOk={applyChanges}
        open={show}
      >
        {items
          ? <>
            <Transfer
              dataSource={items.map(item => ({
                key: item.path,
                title: item.name
              }))}
              onChange={onChange}
              onSelectChange={onSelectChange}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              titles={titles}
              render={item => item.title}
              className='mods-transfer'
            />
            <Button onClick={addManual} className='mods-manual-button'>
              {$.MANUAL_MOD}
            </Button>
          </>
          : <Spin className='mods-spin'/>
        }
      </Modal>
    )
  }

  function loadMods(): void {
    if (props.show && !state.items) {
      setTimeout(() => {
        mods.load().then(items => {
          state.items = items
          state.targetKeys = getTargetKeys(items)
        })
      }, 500)
    }
  }

  function onHidePopup(): void {
    if (!state.items) return
    state.targetKeys = getTargetKeys(state.items)
    props.hidePopup()
  }

  function applyChanges(): void {
    if (!state.items) return
    mods.save(state.targetKeys, state.items)
    props.hidePopup(true)
  }

  function addManual(): void {
    const { items } = state
    const mod = mods.requestMod()
    if ( !mod
      || !items
      || items.find(item => item.name === mod.id)
    ) return

    state.items = [
      ...items,
      {
        name: mod.id,
        path: mod.path
      }
    ]
  }

  function onChange(nextTarget: string[]): void {
    state.targetKeys = nextTarget
  }

  function onSelectChange(source: string[], target: string[]): void {
    state.selectedKeys = [...source, ...target]
  }

  function getTargetKeys(items: IFindItem[]): string[] {
    const keys = mods.itemToKeys(items)

    return Object.values(config.mods.items)
      .filter(value => keys.includes(value.path))
      .map(value => value.path)
  }
}

export default afcMemo(ModsPopup)
