import { Provider } from 'react-redux'

import Main from './Main'
import { store } from './store'

import { Helpers } from '#r/services'

import '#r/templateScript'

Helpers.renderComponent(
  <Provider store={store}>
    <Main />
  </Provider>
)
