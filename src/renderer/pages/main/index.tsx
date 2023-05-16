import { Provider } from 'react-redux'

import Main from './Main'
import { store } from './store'

import { helpers } from '#r/services'

import '#r/templateScript'

helpers.renderComponent(
  <Provider store={store}>
    <Main />
  </Provider>
)
