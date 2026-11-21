import { Language } from '@renderer/components/language'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { BoolSetting } from './bool-setting'
import { SETTINGS_LOCALIZATION as texts } from './localization'
import './settings.scss'

/** Параметры окна настроек. */
export interface SettingsProps {
	/** Открыто ли окно. */
	open: boolean

	/** Изменить состояние окна. */
	onOpenChange(open: boolean): void
}

/** Окно настроек. */
export function Settings({ open, onOpenChange }: SettingsProps) {
	const config = di.resolve(CONFIG_TOKEN)
	const [updates, setUpdates] = useState(config.checkUpdates)
	const [mods, setMods] = useState(config.useMods)
	const [optimizeUnpack, setOptimizeUnpack] = useState(config.optimizeUnpack)
	const [advanced, setAdvanced] = useState(config.advancedMode)

	useEffect(() => {
		if (!open) {
			return
		}

		setUpdates(config.checkUpdates)
		setMods(config.useMods)
		setOptimizeUnpack(config.optimizeUnpack)
		setAdvanced(config.advancedMode)
	}, [open, config])

	function changeUpdates(value: boolean) {
		setUpdates(value)
		config.checkUpdates = value
	}

	function changeMods(value: boolean) {
		setMods(value)
		config.useMods = value
	}

	function changeOptimizeUnpack(value: boolean) {
		setOptimizeUnpack(value)
		config.optimizeUnpack = value
	}

	function changeAdvanced(value: boolean) {
		setAdvanced(value)
		config.advancedMode = value
	}

	return (
		<Modal
			open={open}
			width="fit-content"
			title={texts.title}
			onCancel={() => onOpenChange(false)}
			footer={(
				<Button key="submit" type="primary" onClick={() => onOpenChange(false)}>
					Ok
				</Button>
			)}
		>
			<div className="settings">
				<Language />

				<div className="checkboxes">
					<BoolSetting
						checked={updates}
						label={texts.updatesLabel}
						onChange={changeUpdates}
					/>
					<BoolSetting
						checked={mods}
						label={texts.modsLabel}
						onChange={changeMods}
					/>
					<BoolSetting
						checked={optimizeUnpack}
						label={texts.optimizeUnpackLabel}
						tip={texts.optimizeUnpackTip}
						onChange={changeOptimizeUnpack}
					/>
					<BoolSetting
						checked={advanced}
						label={texts.advancedModeLabel}
						onChange={changeAdvanced}
					/>
				</div>
			</div>
		</Modal>
	)
}
