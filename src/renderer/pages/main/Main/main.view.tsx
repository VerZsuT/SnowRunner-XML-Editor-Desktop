import { afc } from 'react-afc'

import MainController from './main.controller'
import MainModel from './main.model'

export default afc(function MainView() {
  const model = new MainModel()
  new MainController()

  return () => (
    <model.currentPage />
  )
})
