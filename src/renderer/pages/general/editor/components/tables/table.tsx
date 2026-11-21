import type { IFile } from '@modules/files/renderer'
import type { TruckXML } from '@modules/xml/renderer'
import { TruckFileType } from '@modules/xml/renderer'
import { Trailer } from './trailer/trailer'
import { Truck } from './truck/truck'
import './table.scss'

/** Параметры таблицы редактора. */
export interface TableProps {
	/** XML автомобиля/прицепа. */
	xml: TruckXML

	/** Файл. */
	file: IFile

	/** Событие готовности таблицы. */
	onReady?(): void
}

/** Таблица редактора. */
export function Table({ xml, file, onReady }: TableProps) {
	return (
		<div className="table">
			{xml.Type === TruckFileType.trailer
				? <Trailer xml={xml} file={file} onReady={onReady} />
				: <Truck xml={xml} file={file} onReady={onReady} />}
		</div>
	)
}
