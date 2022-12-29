import type { ReactNode } from 'react'

import { pafcMemo, useActions } from 'react-afc'

import Header from '#components/Header'
import { Page } from '#enums'
import { ERROR } from '#globalTexts/renderer'
import { actions } from '#pages/main/store'

function ErrorHeader() {
  function render(): ReactNode {
    return (
      <Header
        text={ERROR}
        onBack={onBack}
      />
    )
  }

  const { route } = useActions(actions)

  function onBack(): void {
    route(Page.lists)
  }

  return render
}

export default pafcMemo(ErrorHeader)
