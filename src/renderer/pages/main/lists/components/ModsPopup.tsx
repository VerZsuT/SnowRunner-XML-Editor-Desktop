import {useEffect} from 'react'

import {Button, Modal, Spin, Transfer} from 'antd'
import {globalTexts} from 'globalTexts/renderer'
import {afcMemo, createState} from 'react-afc'
import {config} from 'scripts/config'
import {getPreload} from 'scripts/getPreload'
import type {ConfigModsItems, ListPreload} from 'types'

import {listsTexts} from '../texts'

const { basename } = window.service
const { MODS_POPUP_TITLE, MANUAL_MOD } = listsTexts
const { LOADING } = globalTexts
const { findMods, getModPak } = getPreload<ListPreload>('listPreload')

interface Props {
    hidePopup(reload?: boolean): void
    show: boolean
}

interface Item {
    name: string
    path: string
}

export const ModsPopup = afcMemo<Props>(props => {
    const [state, setState] = createState({
        items: null as Item[],
        targetKeys: [] as string[],
        selectedKeys: [] as string[]
    })

    function loadMods() {
        const { show } = props
        const { items } = state

        if (show && !items) {
            setTimeout(() => {
                findMods().then(items => {
                    setState({
                        items,
                        targetKeys: getTargetKeys(items)
                    })
                })
            }, 500)
        }
    }

    function onHidePopup() {
        setState({ targetKeys: getTargetKeys(state.items) })
        props.hidePopup()
    }

    function applyChanges() {
        const { targetKeys, items } = state

        const length = targetKeys.length
        const selected = KeysToModsItems(targetKeys, items)

        config.mods = {
            length,
            items: selected
        }
        props.hidePopup(true)
    }

    function addManual() {
        const { items } = state

        const result = getModPak()
        if (!result) return

        for (let i = 0; i < items.length; ++i) {
            if (result.id === items[i].name)
                return
        }

        setState({
            items: [
                ...items,
                {
                    name: result.id,
                    path: result.path
                }
            ]
        })
    }

    function onChange(nextTarget: string[]) {
        setState({ targetKeys: nextTarget })
    }
    
    function onSelectChange(source: string[], target: string[]) {
        setState({ selectedKeys: [...source, ...target] })
    }

    const titles = ['Найдено', 'Добавлено']

    return () => {
        const { show } = props
        const { items, targetKeys, selectedKeys } = state

        useEffect(loadMods)

        return (
            <Modal
                title={items ? MODS_POPUP_TITLE : LOADING}
                onCancel={onHidePopup}
                onOk={applyChanges}
                visible={show}
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
                            {MANUAL_MOD}
                        </Button>
                    </>
                    : <Spin className='mods-spin' />
                }
            </Modal>
        )
    }
})

function ItemToKeys(items: Item[]): string[] {
    return items.map(item => item.path)
}

function KeysToModsItems(keys: string[], items: Item[]): ConfigModsItems {
    const out: ConfigModsItems = {}

    keys.forEach(key => {
        Object.values(items).forEach(item => {
            if (item.path === key) {
                out[basename(item.path, '.pak')] = {
                    name: basename(item.path),
                    path: item.path
                }
            }
        })
    })

    return out
}

function getTargetKeys(items: Item[]) {
    const keys = ItemToKeys(items)

    return Object.values(config.mods.items)
        .filter(value => keys.includes(value.path))
        .map(value => value.path)
}
