import type { FocusEvent } from 'react'

import { Button, Input, Select, Spin, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../texts'
import ContentField from './ContentField'
import AddonsContentController from './addonscontent.controller'
import AddonsContentModel from './addonscontent.model'

import type { IExtraActionProps } from '#g/types'

const { Text } = Typography

function AddonsContentComponent(props: IExtraActionProps) {
  const model = new AddonsContentModel(props)
  const ctrlr = new AddonsContentController(props, model)

  return () => {
    const { items, selectedAddon, wheels, repairs, fuel, options } = model

    if (!items) {
      return <Spin className='mods-spin' />
    }

    return <>
      <div className='ac-main'>
        <Text>
          {$.ADDON_NAME}
        </Text><br />
        <Input
          type='text'
          onBlur={onBlurFilter}
          className='ac-content'
          placeholder={$.ADDON_FILTER}
        /><br /><br />
        <Select
          value={selectedAddon}
          onChange={onSelect}
          options={options}
        />
      </div>
      <div className='grid ac-grid'>
        <ContentField text={$.ADDON_WHEELS} value={wheels} onChange={onChangeWheels} />
        <ContentField text={$.ADDON_REPAIRS} value={repairs} onChange={onChangeRepairs} />
        <ContentField text={$.ADDON_FUEL} value={fuel} onChange={onChangeFuel} />
      </div>

      <Button
        className='ac-save'
        onClick={onSaveClick}
        type='primary'
      >
        {$.ADDON_CHANGE_BUTTON}
      </Button>
    </>
  }

  function onChangeWheels(wheels: string): void {
    ctrlr.changeWheels(wheels)
  }
  function onChangeRepairs(repairs: string): void {
    ctrlr.changeRepairs(repairs)
  }
  function onChangeFuel(fuel: string): void {
    ctrlr.changeFuel(fuel)
  }

  function onBlurFilter(e: FocusEvent<HTMLInputElement>): void {
    ctrlr.changeFilter(e.target.value)
  }

  function onSelect(name: string): void {
    ctrlr.select(name)
  }

  function onSaveClick(): void | never {
    ctrlr.save()
  }
}

export default afcMemo(AddonsContentComponent)
