import handleReset from '../../helpers/handleReset'

import { ViewController } from '#r/model-ctrlr'

class GroupController extends ViewController {
  constructor(onReset: () => void) {
    super()
    handleReset(onReset)
  }
}

export default GroupController
