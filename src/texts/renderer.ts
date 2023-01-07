import comparator from './comparator'
import globalTexts from './texts'

import lzn from '#services/localization'

const $ = lzn.localize(globalTexts)

export const compareWithGlobal = comparator($, lzn.localize)

export default $
