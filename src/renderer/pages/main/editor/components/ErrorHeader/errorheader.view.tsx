import { afcMemo } from 'react-afc'

import ErrorHeaderController from './errorheader.controller'

import $ from '#g/texts/renderer'
import { Header } from '#r/components'

function ErrorHeader() {
  const ctrlr = new ErrorHeaderController()

  return () => (
    <Header
      text={$.ERROR}
      onBack={onBack}
    />
  )

  function onBack(): void {
    ctrlr.goToLists()
  }
}

export default afcMemo(ErrorHeader)
