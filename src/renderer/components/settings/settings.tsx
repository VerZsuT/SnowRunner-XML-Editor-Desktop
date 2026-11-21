import { updateConfig } from '@renderer/config'
import { Language } from '@renderer/components/language'
import { useConfig } from '@renderer/utilities/use-reactive'
import { Button, Modal } from 'antd'
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
	const config = useConfig()

	function changeUpdates(value: boolean) {
		updateConfig('checkUpdates', value)
	}

	function changeMods(value: boolean) {
		updateConfig('useMods', value)
	}

	function changeOptimizeUnpack(value: boolean) {
		updateConfig('optimizeUnpack', value)
	}

	function changeAdvanced(value: boolean) {
		updateConfig('advancedMode', value)
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
						checked={config.checkUpdates}
						label={texts.updatesLabel}
						onChange={changeUpdates}
					/>
					<BoolSetting
						checked={config.useMods}
						label={texts.modsLabel}
						onChange={changeMods}
					/>
					<BoolSetting
						checked={config.optimizeUnpack}
						label={texts.optimizeUnpackLabel}
						tip={texts.optimizeUnpackTip}
						onChange={changeOptimizeUnpack}
					/>
					<BoolSetting
						checked={config.advancedMode}
						label={texts.advancedModeLabel}
						onChange={changeAdvanced}
					/>
				</div>
			</div>
		</Modal>
	)
}
