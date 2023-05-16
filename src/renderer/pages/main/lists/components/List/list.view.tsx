import { Button } from 'antd'
import { afcMemo } from 'react-afc'
import type { GridChildComponentProps } from 'react-window'
import { FixedSizeGrid } from 'react-window'

import $ from '../../texts'
import ModsPopup from '../ModsPopup'
import ItemRenderer from './ItemRenderer'
import ListController from './list.controller'
import ListModel from './list.model'
import type IListProps from './list.props'

import { LIST_SCROLL } from '#g/consts'
import { SrcType } from '#g/enums'
import { config, storage } from '#r/services'

const { settings } = config

function ListView(props: IListProps) {
  const model = new ListModel(props)
  const ctrlr = new ListController(props, model)

  return () => {
    const {
      srcType,
      opened,
      category,
      id,
      isShowMods,
      colWidth,
      rowHeight,
      filteredItems,
      gridParams
    } = model

    if (
      (srcType === SrcType.mods && !settings.mods)
      || (srcType === SrcType.dlc && !settings.DLC)
      || !opened
    ) return

    const {
      colCount,
      gridHeight,
      gridWidth,
      gutter,
      rowCount
    } = gridParams

    return (
      <div className='list' id={id}>
        {srcType === SrcType.mods && <>
          <div>
            <Button
              type='primary'
              className='mods-button'
              onClick={onChangeModsClick}
            >
              {$.MODS_CHANGE_BUTTON}
            </Button>
          </div>
          <ModsPopup
            show={isShowMods}
            hidePopup={onHideModsPopup}
          />
        </>}
        <FixedSizeGrid
          initialScrollTop={parseInt(storage.pop(LIST_SCROLL) || '0')}
          className='card-list'
          columnCount={colCount}
          columnWidth={colWidth}
          height={gridHeight}
          width={gridWidth}
          rowHeight={rowHeight}
          rowCount={rowCount}
        >
          {(props: GridChildComponentProps, index: number) => (
            <ItemRenderer
              style={props.style}
              columnIndex={props.columnIndex}
              rowIndex={props.rowIndex}
              gutter={gutter}
              items={filteredItems}
              category={category}
              id={id}
              colCount={colCount}
              key={index}
            />
          )}
        </FixedSizeGrid>
      </div>
    )
  }

  function onChangeModsClick(): void {
    ctrlr.showModsPopup()
  }

  function onHideModsPopup(isReload?: boolean): void {
    ctrlr.hideModsPopup(isReload)
  }
}

export default afcMemo(ListView)
