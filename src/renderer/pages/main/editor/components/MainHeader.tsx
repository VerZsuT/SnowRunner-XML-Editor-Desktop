import type { ReactNode } from 'react'

import {
  ExportOutlined,
  FileOutlined,
  ImportOutlined,
  MenuOutlined,
  MoreOutlined,
  RightOutlined,
  SaveOutlined,
  UndoOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu, message, Modal, Tooltip } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import type { CheerioAPI } from 'cheerio'
import { load } from 'cheerio'
import { Bridge } from 'emr-bridge/renderer'
import { afcMemo, onRender, ref, useActions } from 'react-afc'

import { actions as reduxActions } from '../../store'
import type { ResetList } from '../helpers/getResetProvider'
import { importService } from '../services/import'
import { xmlFiles } from '../services/xmlFiles'
import {
  ACTIONS_MENU,
  IMPORT,
  PATH_TO_SAVE_NOT_FOUND,
  RESET_CONFIRM_MESSAGE,
  SAVING_MESSAGE,
  SUCCESS_RESET,
  SUCCESS_SAVE_FILES,
  WAS_EXPORTED
} from '../texts'

import { Header } from '#components/Header'
import { Page, PreloadType } from '#enums'
import { EXPORT, OPEN_BUTTON, RESET_MENU_ITEM_LABEL, SAVE_BUTTON } from '#globalTexts/renderer'
import { config, helpers, preload, system, xml } from '#services'
import type { IEditorPreload, IMPC, IXMLTemplate, TemplateParams } from '#types'

const bridge = Bridge.as<IMPC>()
const { confirm } = Modal
const { watchFile } = preload.get<IEditorPreload>(PreloadType.editor)

type Props = {
  fileDOM: CheerioAPI
  filePath: string
  mod: string
  dlc: string
  actions: IXMLTemplate['actions']
  tableItems: TemplateParams
  resetList: ResetList
}

export const MainHeader = afcMemo((props: Props) => {
  const {
    fileDOM, mod, dlc, actions, filePath,
    tableItems, resetList
  } = props
  
  let menuItems: MenuProps['items']
  const title = getMainTitle(fileDOM, filePath, mod)

  const action = ref<ReactNode>(null)
  xmlFiles.subscribe()

  onRender(() => {
    menuItems = [
      {
        label: ACTIONS_MENU,
        icon: <MoreOutlined/>,
        key: 'actions',
        children: actions?.map(item => ({
          key: `action-${item.data.id}`,
          label: item.data.name,
          icon: item.data.imgSRC
            ? <img src={item.data.imgSRC}/>
            : <RightOutlined/>,
          onClick() {
            action.value = <item.Component
              filePath={filePath}
              currentMod={mod}
              dom={fileDOM}
            />
          }
        }))
      },
      {
        onClick: !mod ? onReset : () => null,
        icon: <UndoOutlined/>,
        label: RESET_MENU_ITEM_LABEL,
        key: 'reset'
      },
      {
        onClick: onExportFile,
        icon: <ExportOutlined/>,
        label: EXPORT,
        key: 'export'
      },
      {
        onClick: () => importService.importFile(filePath, fileDOM, actions),
        icon: <ImportOutlined/>,
        label: IMPORT,
        key: 'import'
      },
      ...ifAdvanced({
        key: 'files',
        label: OPEN_BUTTON,
        icon: <FileOutlined/>,
        children: xmlFiles.files.map(file => ({
          key: file.path,
          label: system.basename(file.path),
          icon: <img src={require(`#images/icons/${file.type}.png`)}/>,
          onClick() {
            void bridge.openPath(file.path)
            watchFile(file.path, () => window.location.reload())
          }
        }))
      })
    ]
  })

  function render(): ReactNode {
    return <>
      {action.value}
      <Header
        text={title}
        onBack={onBack}
        extra={[
          <Dropdown.Button
            key='menu'
            type='text'
            className='menu-button'
            icon={<MenuOutlined/>}
            overlay={
              <Menu
                selectable={false}
                mode='vertical'
                items={menuItems}
              />
            }
          />,
          <Tooltip title={SAVE_BUTTON} key='save'>
            <Button
              id='save'
              className='save-button'
              type='text'
              shape='circle'
              icon={<SaveOutlined/>}
              onClick={onSave}
            />
          </Tooltip>
        ]}
      />
    </>
  }

  const { route } = useActions(reduxActions)

  function onExportFile(): void {
    const pathToSave = bridge.saveEPF(system.basename(filePath, '.xml'))
    if (!pathToSave) {
      void message.error(PATH_TO_SAVE_NOT_FOUND)
      return
    }

    const exported = xml.exportToObject({
      filePath,
      shortMode: false,
      mod,
      dlc,
      fileDOM,
      templateItems: tableItems,
      actions
    })

    system.writeFileSync(pathToSave, JSON.stringify(exported, null, '\t'))
    void message.success(WAS_EXPORTED)
  }

  function onBack(): void {
    route(Page.lists)
  }

  function onReset(): void {
    confirm({
      title: RESET_CONFIRM_MESSAGE,
      onOk() {
        resetList.forEach(callback => callback())
        void message.success(SUCCESS_RESET)
      }
    })
  }

  async function onSave(): Promise<void> {
    const hideLoading = message.loading(SAVING_MESSAGE)
    await new Promise<void>(resolve => {
      setTimeout(() => {
        xmlFiles.files.forEach(file => {
          const dom = load(file.dom.html(), { xmlMode: true })
          dom('[SXMLE_ID]').map((_, el) => dom(el).removeAttr('SXMLE_ID'))
          system.writeFileSync(file.path, dom.html())
        })

        mod && bridge.updateFiles(mod)
        bridge.updateFiles()

        hideLoading()
        message.success(SUCCESS_SAVE_FILES)
        resolve()
      }, 100)
    })
  }

  function getMainTitle(DOM: CheerioAPI, path: string, modName: string): string {
    if (DOM('GameData UiDesc').length === 1) {
      const text = DOM('GameData UiDesc').attr('UiName')
      return helpers.getGameText(text, modName) ?? text ?? 'TITLE_ERROR'
    }
  
    if (path.split('/').length !== 1) {
      const a = path.split('/')
      return helpers.prettyString(a[a.length - 1].replace('.xml', '')).toUpperCase()
    }
  
    const a = path.split('\\')
    return helpers.prettyString(a[a.length - 1].replace('.xml', '')).toUpperCase()
  }
  
  function ifAdvanced(item: ItemType): ItemType[] {
    return config.settings.advancedMode ? [item] : []
  }

  return render
})
