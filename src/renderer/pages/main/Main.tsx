import type { ReactNode } from 'react'

import { pafcMemo, useRedux } from 'react-afc'

import Editor from './editor'
import Lists from './lists'
import { selectPage } from './store/pageSlice'

import { Page, ProgramWindow } from '#enums'
import useWindowReady from '#helpers/useWindowReady'

function Main() {
  const pages = {
    [Page.editor]: <Editor/>,
    [Page.lists]: <Lists/>
  }

  const store = useRedux({
    page: selectPage
  })
  useWindowReady(ProgramWindow.Main)

  function render(): ReactNode {
    return pages[store.page]
  }

  return render
}

export default pafcMemo(Main)
