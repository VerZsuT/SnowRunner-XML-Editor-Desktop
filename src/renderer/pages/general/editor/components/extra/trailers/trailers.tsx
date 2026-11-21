import type { IExportedData } from '@modules/epf/types'
import { useConfig } from '@renderer/utilities/use-reactive'
import { Button, Typography } from 'antd'
import { useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import type { IActionProps } from '../../../types'
import { exportUtils } from '../../../utilities/export'
import { useExportListener, useImportListener } from '../../../utilities/hooks'
import { importUtils } from '../../../utilities/import'
import { Group } from '../../group/group'
import type { ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { EXTRA_LOCALIZATION as texts } from '../localization'
import { TrailersAction } from './action'
import { Trailer } from './trailer'
import './trailers.scss'

const { Text } = Typography

/** Параметры вкладки `Прицепы`. */
export type TrailersProps = ReadyProps & IActionProps

/** Вкладка `Прицепы`. */
export function Trailers({ file, xml, onReady, onMount }: TrailersProps) {
	// Подписка на смену языка: подпись группы вычисляется в геттере.
	useConfig()
	const info = useEditorStore(state => state.info)
	const action = new TrailersAction()
	const hasTrailers = action.hasTrailers(xml)
	const [hasScout, setHasScout] = useState(hasTrailers[0])
	const [hasTruck, setHasTruck] = useState(hasTrailers[1])
	const isActive = action.isActive(xml)
	const label = action.name

	useReady({ onReady, onMount })

	useExportListener(data => {
		if (!isActive) {
			return
		}

		const name = exportUtils.getName(file, info.dlc, info.mod)

		if (!data.actionsData[name]) {
			data.actionsData[name] = {}
		}

		const actionsData = data.actionsData[name]

		actionsData[action.id] = action.export(xml)
	})

	useImportListener((data: IExportedData) => {
		if (!isActive) {
			return
		}

		const actionData = data.actionsData[importUtils.getName(file, info.dlc, info.mod)]?.[action.id]

		if (actionData) {
			action.import(xml, actionData)
		}
	})

	function addTrailer(trailer: Trailer) {
		if (trailer === Trailer.scout) {
			action.addTrailer(Trailer.scout, Trailer.truck, xml, setHasScout)
		} else {
			action.addTrailer(Trailer.truck, Trailer.scout, xml, setHasTruck)
		}
	}

	function removeTrailer(trailer: Trailer) {
		if (trailer === Trailer.scout) {
			action.removeTrailer(Trailer.scout, xml, setHasScout)
		} else {
			action.removeTrailer(Trailer.truck, xml, setHasTruck)
		}
	}

	if (!isActive) {
		return null
	}

	return (
		<Group label={label} icon={action.icon}>
			<div className="trailers">
				<div className="grid trailers-grid">
					<div className="buttons">
						<Text>{texts.scoutTrailers}</Text><br />
						{hasScout
							? (
								<Button
									disabled={!(hasScout && hasTruck)}
									type="primary"
									danger
									onClick={() => removeTrailer(Trailer.scout)}
								>
									{texts.remove}
								</Button>
							)
							: (
								<Button
									disabled={!(hasTruck && !hasScout)}
									type="primary"
									onClick={() => addTrailer(Trailer.scout)}
								>
									{texts.add}
								</Button>
							)}
					</div>
					<div className="buttons">
						<Text>{texts.truckTrailers}</Text><br />
						{hasTruck
							? (
								<Button
									disabled={!(hasScout && hasTruck)}
									type="primary"
									danger
									onClick={() => removeTrailer(Trailer.truck)}
								>
									{texts.remove}
								</Button>
							)
							: (
								<Button
									disabled={!(hasScout && !hasTruck)}
									type="primary"
									onClick={() => addTrailer(Trailer.truck)}
								>
									{texts.add}
								</Button>
							)}
					</div>
				</div>
			</div>
		</Group>
	)
}
