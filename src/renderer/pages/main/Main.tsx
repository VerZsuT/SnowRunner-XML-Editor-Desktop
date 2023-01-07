import { pafc, useRedux } from 'react-afc'

import Editor from './editor'
import Lists from './lists'
import { selectPage } from './store/pageSlice'

import { Page, ProgramWindow } from '#enums'
import useWindowReady from '#helpers/useWindowReady'

function Main() {
  const pages = {
    [Page.lists]: Lists,
    [Page.editor]: Editor
  }

  const store = useRedux({
    page: selectPage
  })
  useWindowReady(ProgramWindow.Main)

  return () => {
    const Page = pages[store.page]
    return <Page/>
  }
}

export default pafc(Main)
