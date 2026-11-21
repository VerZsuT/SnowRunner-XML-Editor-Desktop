import type { IExportedData } from '@modules/epf/types'
import { useConfig } from '@renderer/utilities/use-reactive'
import { Button, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import type { IActionProps } from '../../../types'
import { exportUtils } from '../../../utilities/export'
import { useExportListener, useImportListener } from '../../../utilities/hooks'
import { importUtils } from '../../../utilities/import'
import { Group } from '../../group/group'
import type { ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { EXTRA_LOCALIZATION as texts } from '../localization'
import { CranesAction } from './action'
import { Crane } from './crane'
import './cranes.scss'

const { Paragraph, Text } = Typography

/** Параметры вкладки `Краны`. */
export type CranesProps = ReadyProps & IActionProps

/** Вкладка `Краны`. */
export function Cranes({ file, xml, onReady, onMount }: CranesProps) {
	const config = useConfig()
	const info = useEditorStore(state => state.info)
	const action = useMemo(() => new CranesAction(), [])
	const hasCranes = useMemo(() => action.hasCranes(xml), [action, xml])
	const [hasRU, setHasRU] = useState(hasCranes[0])
	const [hasUS, setHasUS] = useState(hasCranes[1])
	const isActive = action.isActive(xml)
	const label = useMemo(() => action.name, [config.lang])

	useReady({ onReady, onMount })

	useExportListener(data => {
		if (!isActive) {
			return
		}

		const actionsData = data.actionsData[exportUtils.getName(file, info.dlc, info.mod)] ??= {}

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

	function addCrane(crane: Crane) {
		if (crane === Crane.RU) {
			action.addCrane(Crane.RU, Crane.US, xml, setHasRU)
		} else {
			action.addCrane(Crane.US, Crane.RU, xml, setHasUS)
		}
	}

	function removeCrane(crane: Crane) {
		if (crane === Crane.RU) {
			action.removeCrane(Crane.RU, xml, setHasRU)
		} else {
			action.removeCrane(Crane.US, xml, setHasUS)
		}
	}

	if (!isActive) {
		return null
	}

	return (
		<Group label={label} icon={action.icon}>
			<div className="cranes">
				<Paragraph className="warn-title">
					{texts.cranesWarnTitle}
				</Paragraph>
				<Paragraph className="warn-content">
					{texts.cranesWarnMessage}
				</Paragraph>

				<div className="grid cranes-grid">
					<div className="buttons">
						<Text>
							US {texts.crane}
						</Text><br />
						{hasUS
							? (
								<Button
									disabled={!(hasRU && hasUS)}
									type="primary"
									danger
									onClick={() => removeCrane(Crane.US)}
								>
									{texts.remove}
								</Button>
							)
							: (
								<Button
									disabled={!(hasRU && !hasUS)}
									type="primary"
									onClick={() => addCrane(Crane.US)}
								>
									{texts.add}
								</Button>
							)}
					</div>
					<div className="buttons">
						<Text>
							RU {texts.crane}
						</Text><br />
						{hasRU
							? (
								<Button
									disabled={!(hasRU && hasUS)}
									type="primary"
									danger
									onClick={() => removeCrane(Crane.RU)}
								>
									{texts.remove}
								</Button>
							)
							: (
								<Button
									disabled={!(hasUS && !hasRU)}
									type="primary"
									onClick={() => addCrane(Crane.RU)}
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
