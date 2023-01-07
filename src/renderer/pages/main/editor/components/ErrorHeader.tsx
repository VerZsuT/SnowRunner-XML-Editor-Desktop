import { pafcMemo, useActions } from 'react-afc'

import Header from '#components/Header'
import { Page } from '#enums'
import $ from '#gl-texts/renderer'
import { actions } from '#pages/main/store'

function ErrorHeader() {
  const { route } = useActions(actions)
  
  return () => (
    <Header
      text={$.ERROR}
      onBack={onBack}
    />
  )

  function onBack(): void {
    route(Page.lists)
  }
}

export default pafcMemo(ErrorHeader)
