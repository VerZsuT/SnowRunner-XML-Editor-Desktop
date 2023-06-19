import handleReset from '../../helpers/handleReset'

import { ViewController } from '#r/model-ctrlr'

export default class GroupController extends ViewController {
  constructor(onReset: () => void) {
    super()
    handleReset(onReset)
  }
}
