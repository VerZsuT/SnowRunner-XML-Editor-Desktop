import type { IStringAttrDescriptor, XmlElement, XmlValue } from '../../attributes'
import { stringAttr } from '../../attributes'
import { BaseUiDesc } from '../../base/ui-desc'
import { innerElement } from '../../xml-with-templates'

/** Блок UI. */
export class TruckUiDesc extends BaseUiDesc {
	/** Реалистичная фотография-скриншот из игры с машиной в выгодном ракурсе. */
	@stringAttr()
	accessor UiIcon328x458: XmlValue<string>
	declare $UiIcon328x458: IStringAttrDescriptor

	/** Блок UI для региона. */
	@innerElement(() => TruckUiDesc, 'region\\:default')
	readonly DefaultRegion: XmlElement<TruckUiDesc>
}
