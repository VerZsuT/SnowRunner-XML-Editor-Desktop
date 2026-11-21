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
import { BanditCraneAction } from './action'
import './bandit-crane.scss'

const { Paragraph } = Typography

/** Параметры вкладки `Банан бандита`. */
export type BanditCraneProps = ReadyProps & IActionProps

/** Вкладка `Банан бандита`. */
export function BanditCrane({ file, xml, onReady, onMount }: BanditCraneProps) {
	const config = useConfig()
	const info = useEditorStore(state => state.info)
	const action = useMemo(() => new BanditCraneAction(), [])
	const isActive = action.isActive(file)
	const [hasCrane, setHasCrane] = useState(() => action.hasCrane(xml))
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

	function addCrane() {
		action.addCrane(xml)
		setHasCrane(true)
	}

	function removeCrane() {
		action.removeCrane(xml)
		setHasCrane(false)
	}

	if (!isActive) {
		return null
	}

	return (
		<Group label={label} icon={action.icon}>
			<div className="bandit-crane">
				<Paragraph className="warn-title">
					{texts.cranesWarnTitle}
				</Paragraph>
				<Paragraph>{texts.banditWarnMessage}</Paragraph>
				<div className="buttons">
					{hasCrane
						? (
							<Button
								type="primary"
								danger
								onClick={removeCrane}
							>
								{texts.remove}
							</Button>
						)
						: (
							<Button
								type="primary"
								onClick={addCrane}
							>
								{texts.add}
							</Button>
						)}
				</div>
			</div>
		</Group>
	)
}
