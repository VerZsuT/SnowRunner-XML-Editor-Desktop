import type { IBooleanAttrDescriptor, INumberAttrDescriptor, XmlElement, XmlValue } from '../../attributes'
import { booleanAttr, integerAttr, properties } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import BaseUiDesc from '../ui-desc'
import texts from './texts'

/** Информация о взаимодействии сущности с окружающим миром. */
export default class BaseGameData extends XMLWithTemplates {
  /** Цена. */
  @properties({
    get label() { return texts.price },
    get desc() { return texts.priceDesc },
    step: 100,
    limit: Limit.Positive.fixed(),
    default: 0
  })
  @integerAttr()
  accessor Price: XmlValue<number>
  declare $Price: INumberAttrDescriptor

  /** Разблокируется разведкой. */
  @properties({
    get label() { return texts.unlockByExploration },
    get desc() { return texts.unlockByExplorationDesc },
    default: false
  })
  @booleanAttr()
  accessor UnlockByExploration: XmlValue<boolean>
  declare $UnlockByExploration: IBooleanAttrDescriptor

  /** Разблокируется рангом. */
  @properties({
    get label() { return texts.unlockByRank },
    get desc() { return texts.unlockByRankDesc },
    limit: new Limit({ min: 1, max: 30, fixed: true }),
    default: 1
  })
  @integerAttr()
  accessor UnlockByRank: XmlValue<number>
  declare $UnlockByRank: INumberAttrDescriptor

  /** Блок UI */
  @innerElement(BaseUiDesc)
  readonly UiDesc: XmlElement<BaseUiDesc>
}
