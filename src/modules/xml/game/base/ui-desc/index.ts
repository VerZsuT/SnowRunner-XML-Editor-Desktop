import type { IStringAttrDescriptor, XmlValue } from '../../attributes'
import { properties, stringAttr } from '../../attributes'
import { XMLWithTemplates } from '../../xml-with-templates'
import { UI_DESC_LOCALIZATION as texts } from './localization'

/** Блок User Interface (UI). */
export class BaseUiDesc extends XMLWithTemplates {
	/** Описание. */
	@properties({
		get label() { return texts.uiDesc },
		get desc() { return texts.uiDescDesc }
	})
	@stringAttr()
	accessor UiDesc: XmlValue<string>
	declare $UiDesc: IStringAttrDescriptor

	/** Название. */
	@properties({
		get label() { return texts.uiName },
		get desc() { return texts.uiNameDesc }
	})
	@stringAttr()
	accessor UiName: XmlValue<string>
	declare $UiName: IStringAttrDescriptor
}
