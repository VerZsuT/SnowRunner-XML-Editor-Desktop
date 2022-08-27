import {Page, Window} from 'enums'
import {windowReady} from 'helpers/windowReady'
import {afc, useRedux} from 'react-afc'
import {Provider} from 'react-redux'
import {render} from 'scripts/helpers'

import {Editor} from './editor'
import {Lists} from './lists'
import {store} from './store'
import {selectPage} from './store/pageSlice'

const pages = {
    [Page.editor]: <Editor />,
    [Page.lists]: <Lists />
}

const Main = afc(() => {
    windowReady(Window.Main)
    const reduxState = useRedux({
        page: selectPage
    })
    
    return () => pages[reduxState.page]
})

render(
    <Provider store={store}>
        <Main />
    </Provider>
)
