import type { Config, PathsDto } from '@/api/bindings'
import { applyConfig, fromConfigDto, useConfig } from '@/config'
import { LOCALES } from '@/utilities/localization'
import { formatString } from '@/utilities/strings'
import { App as AntApp, Button, Modal, Select, Switch, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import type { SettingsClient } from './client'
import { settingsClient } from './client'
import './settings.scss'

/** Языки программы в порядке выбора. */
const LANGUAGES = [
	{ label: 'Русский', value: 'RU' },
	{ label: 'English', value: 'EN' },
	{ label: 'Deutsch', value: 'DE' },
	{ label: '中文', value: 'CH' }
]

/** Параметры окна настроек. */
export interface SettingsModalProps {
	/** Окно открыто. */
	open: boolean

	/** Закрывает окно. */
	onClose(): void

	/** Клиент команд: подменяется в тестах. */
	client?: SettingsClient
}

/**
 * Окно настроек: язык программы и переключатели, как в 1.4.0.
 *
 * Значения сохраняются сразу; язык применяется перезагрузкой окна,
 * потому что тексты остальных экранов фиксируются при загрузке.
 */
export function SettingsModal({ open, onClose, client = settingsClient }: SettingsModalProps) {
	const { message, modal } = AntApp.useApp()
	const ui = useConfig()
	// Тексты читаются из состояния: смена языка видна без перезагрузки окна.
	const texts = LOCALES[ui.lang].settings
	const setupTexts = LOCALES[ui.lang].setup
	const [config, setConfig] = useState<Config | null>(null)
	const [paths, setPaths] = useState<PathsDto | null>(null)
	// Последняя сохранённая конфигурация и очередь записей: быстрые
	// переключения не должны затирать друг друга устаревшим снимком.
	const savedConfig = useRef<Config | null>(null)
	const saveQueue = useRef<Promise<unknown>>(Promise.resolve())

	useEffect(() => {
		if (!open) {
			return
		}

		let cancelled = false

		Promise.all([client.config(), client.paths()]).then(
			([nextConfig, nextPaths]) => {
				if (!cancelled) {
					savedConfig.current = nextConfig
					setConfig(nextConfig)
					setPaths(nextPaths)
				}
			},
			reason => {
				if (!cancelled) {
					message.error(toMessage(reason))
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [client, message, open])

	/** Сохраняет одно изменение; очередь не даёт потерять соседнюю правку. */
	function update(patch: Partial<Config>): Promise<boolean> {
		const run = saveQueue.current.then(async () => {
			const base = savedConfig.current

			if (!base) {
				return false
			}

			try {
				const saved = await client.saveConfig({ ...base, ...patch })

				savedConfig.current = saved
				setConfig(saved)
				applyConfig(fromConfigDto(saved))

				return true
			} catch (reason) {
				message.error(toMessage(reason))

				return false
			}
		})

		saveQueue.current = run.then(() => undefined, () => undefined)

		return run
	}

	async function changeLang(lang: string) {
		if (await update({ lang })) {
			client.reload()
		}
	}

	function confirmMode(portable: boolean) {
		modal.confirm({
			title: setupTexts.modeConfirm,
			okText: portable ? setupTexts.modePortable : setupTexts.modeInstalled,
			cancelText: setupTexts.cancel,
			onOk: async () => {
				try {
					const result = await client.switchMode(portable)

					message.success(formatString(setupTexts.modeSwitched, String(result.copied)))
					modal.confirm({
						title: setupTexts.restartConfirm,
						okText: setupTexts.restart,
						cancelText: setupTexts.cancel,
						onOk: () => client.restart()
					})
				} catch (reason) {
					message.error(toMessage(reason))
				}
			}
		})
	}

	return (
		<Modal
			open={open}
			title={texts.title}
			width={420}
			onCancel={onClose}
			centered
			footer={(
				<Button type="primary" onClick={onClose}>
					Ok
				</Button>
			)}
		>
			{config && paths
				? (
					<div className="settings">
						<div className="settings-language">
							<Typography.Text>{texts.language}</Typography.Text>
							<Select
								value={config.lang}
								options={LANGUAGES}
								onChange={value => void changeLang(value)}
							/>
						</div>

						<div className="settings-checkboxes">
							<SwitchOption
								label={texts.updates}
								checked={config.checkUpdates ?? true}
								onChange={value => void update({ checkUpdates: value })}
							/>
							<SwitchOption
								label={texts.mods}
								checked={config.useMods ?? true}
								onChange={value => void update({ useMods: value })}
							/>
							<SwitchOption
								label={texts.advanced}
								checked={config.advancedMode ?? false}
								onChange={value => void update({ advancedMode: value })}
							/>
							<SwitchOption
								label={texts.portable}
								checked={paths.mode === 'portable'}
								disabled={paths.mode === 'dev'}
								onChange={value => confirmMode(value)}
							/>
						</div>
					</div>
				)
				: null}
		</Modal>
	)
}

/** Переключатель с подписью. */
function SwitchOption({
	label,
	checked,
	disabled,
	onChange
}: {
	label: string
	checked: boolean
	disabled?: boolean
	onChange(value: boolean): void
}) {
	return (
		<div className="settings-option">
			<Switch size="small" checked={checked} disabled={disabled} onChange={onChange} />
			<Typography.Text className="settings-label">{label}</Typography.Text>
		</div>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
