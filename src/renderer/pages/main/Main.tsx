import type { ReactNode } from 'react'

import { afcMemo, useRedux } from 'react-afc'

import { Editor } from './editor'
import { Lists } from './lists'
import { selectPage } from './store/pageSlice'

import { Page, ProgramWindow } from '#enums'
import { windowReady } from '#helpers/windowReady'

export const Main = afcMemo(() => {
  const pages = {
    [Page.editor]: <Editor/>,
    [Page.lists]: <Lists/>
  }

  const store = useRedux({
    page: selectPage
  })
  windowReady(ProgramWindow.Main)

  function render(): ReactNode {
    return pages[store.page]
  }

  return render
})
