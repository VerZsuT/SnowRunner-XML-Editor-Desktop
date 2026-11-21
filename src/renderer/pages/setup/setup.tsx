import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Header } from '@renderer/components/header'
import { applyConfig, fromConfigDto } from '@renderer/config'
import { open } from '@tauri-apps/plugin-dialog'
import { formatString } from '@utilities/strings'
import { App as AntApp, Button, Descriptions, Input, Result, Select, Space, Spin, Switch, Typography } from 'antd'
import { useEffect, useState } from 'react'
import type { Config, ModEntry, PathsDto } from '@renderer/api/bindings'
import type { SetupClient } from './client'
import { setupClient } from './client'
import { SETUP_PAGE_LOCALIZATION as texts } from './localization'
import './setup.scss'

/** Действие экрана настройки, выполняемое сейчас. */
type SetupAction = 'unpack' | 'backup' | 'verify' | 'restore' | 'update' | 'mods' | 'mode'

/** Параметры экрана настройки. */
export interface SetupPageProps {
	/** Вернуться к списку. */
	onBack(): void

	/** Клиент команд: подменяется в тестах. */
	client?: SetupClient
}

/** Экран настройки: пути, распаковка, бэкапы и параметры программы. */
export function SetupPage({ onBack, client = setupClient }: SetupPageProps) {
	const { message, modal } = AntApp.useApp()
	const [paths, setPaths] = useState<PathsDto | null>(null)
	const [config, setConfig] = useState<Config | null>(null)
	const [mods, setMods] = useState<ModEntry[]>([])
	const [error, setError] = useState<string | null>(null)
	const [busy, setBusy] = useState<SetupAction | null>(null)

	useEffect(() => {
		let cancelled = false

		Promise.all([client.paths(), client.config(), client.mods()]).then(
			([nextPaths, nextConfig, nextMods]) => {
				if (!cancelled) {
					setPaths(nextPaths)
					setConfig(nextConfig)
					setMods(nextMods)
				}
			},
			reason => {
				if (!cancelled) {
					setError(toMessage(reason))
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [client])

	async function update(patch: Partial<Config>) {
		if (!config) {
			return
		}

		const saved = await client.saveConfig({ ...config, ...patch })

		setConfig(saved)
		applyConfig(fromConfigDto(saved))
	}

	async function choose() {
		const path = await open({
			multiple: false,
			directory: false,
			filters: [{ name: 'initial.pak', extensions: ['pak'] }]
		})

		if (typeof path !== 'string') {
			return
		}

		try {
			await update({ initialPath: path })
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function toggle(key: 'useMods' | 'advancedMode', value: boolean) {
		try {
			await update(key === 'useMods' ? { useMods: value } : { advancedMode: value })
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function run(action: SetupAction) {
		const path = config?.initialPath

		if (!path) {
			message.warning(texts.noPath)

			return
		}

		setBusy(action)

		try {
			if (action === 'unpack') {
				await client.backup(path)
				message.success(formatString(texts.unpacked, String(await client.unpack(path))))
			} else if (action === 'backup') {
				message.success(formatString(texts.backedUp, await client.backup(path)))
			} else if (action === 'update') {
				message.success(formatString(texts.updated, String(await client.update(path, null))))
			} else if (action === 'verify') {
				message.success(formatString(texts.verified, String(await client.verify(path))))
			} else {
				await client.restore(path)
				message.success(texts.restored)
			}
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(null)
	}

	async function addMods() {
		const selected = await open({
			multiple: true,
			directory: false,
			filters: [{ name: 'mods', extensions: ['pak'] }]
		})
		const files = typeof selected === 'string' ? [selected] : selected

		if (!files?.length) {
			return
		}

		setBusy('mods')

		try {
			let next = mods

			for (const path of files) {
				next = await client.addMod(path)
			}

			setMods(next)
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(null)
	}

	async function updateMod(mod: ModEntry) {
		setBusy('mods')

		try {
			message.success(formatString(texts.updated, String(await client.update(mod.path, mod.name))))
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(null)
	}

	async function removeMod(name: string) {
		setBusy('mods')

		try {
			setMods(await client.removeMod(name))
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(null)
	}

	async function syncMods() {
		setBusy('mods')

		try {
			setMods(await client.syncMods())
			message.success(texts.saved)
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(null)
	}

	async function changeLang(lang: string) {
		try {
			await update({ lang })
			message.success(texts.saved)
			client.reload()
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	function confirmMode(portable: boolean) {
		modal.confirm({
			title: texts.modeConfirm,
			okText: portable ? texts.modePortable : texts.modeInstalled,
			cancelText: texts.cancel,
			onOk: async () => {
				setBusy('mode')

				try {
					const result = await client.switchMode(portable)

					message.success(formatString(texts.modeSwitched, String(result.copied)))
					modal.confirm({
						title: texts.restartConfirm,
						okText: texts.restart,
						cancelText: texts.cancel,
						onOk: () => client.restart()
					})
				} catch (reason) {
					message.error(toMessage(reason))
				}

				setBusy(null)
			}
		})
	}

	function confirm(action: 'unpack' | 'restore') {
		modal.confirm({
			title: action === 'unpack' ? texts.unpackConfirm : texts.restoreConfirm,
			okText: action === 'unpack' ? texts.unpack : texts.restore,
			okButtonProps: { danger: action === 'restore' },
			cancelText: texts.cancel,
			onOk: () => run(action)
		})
	}

	return (
		<div className="setup">
			<Header text={texts.title} withBack onBack={onBack} />
			<div className="setup-content">
				{error
					? (
						<Result
							status="error"
							title={texts.loadError}
							subTitle={error}
							extra={<Button onClick={onBack}>{texts.cancel}</Button>}
						/>
					)
					: !paths || !config
						? <Spin className="setup-spin" size="large" />
						: (
							<Space className="setup-sections" orientation="vertical" size="large">
								<section className="setup-section">
									<Typography.Title level={5}>{texts.paths}</Typography.Title>
									<Descriptions
										bordered
										size="small"
										column={1}
										items={[
											{
												key: 'dataRoot',
												label: texts.dataRoot,
												children: <Typography.Text copyable>{paths.dataRoot}</Typography.Text>
											},
											{ key: 'mode', label: texts.mode, children: modeText(paths.mode) },
											{ key: 'classes', label: texts.classes, children: paths.classes },
											{ key: 'mainTemp', label: texts.mainTemp, children: paths.mainTemp },
											{ key: 'backupFolder', label: texts.backupFolder, children: paths.backupFolder },
											{ key: 'backupInitial', label: texts.backupInitial, children: paths.backupInitial }
										]}
									/>
								</section>

								<section className="setup-section">
									<Typography.Title level={5}>{texts.game}</Typography.Title>
									<Typography.Text type="secondary">{texts.archivePath}</Typography.Text>
									<Space.Compact className="setup-archive">
										<Input
											readOnly
											value={config.initialPath ?? ''}
											placeholder={texts.noPath}
										/>
										<Button onClick={() => void choose()}>{texts.choose}</Button>
									</Space.Compact>
									<Space wrap>
										<Button
											type="primary"
											loading={busy === 'unpack'}
											disabled={!config.initialPath}
											onClick={() => confirm('unpack')}
										>
											{texts.unpack}
										</Button>
										<Button
											loading={busy === 'update'}
											disabled={!config.initialPath}
											onClick={() => void run('update')}
										>
											{texts.update}
										</Button>
										<Button
											loading={busy === 'backup'}
											disabled={!config.initialPath}
											onClick={() => void run('backup')}
										>
											{texts.backup}
										</Button>
										<Button
											loading={busy === 'verify'}
											disabled={!config.initialPath}
											onClick={() => void run('verify')}
										>
											{texts.verify}
										</Button>
										<Button
											danger
											loading={busy === 'restore'}
											disabled={!config.initialPath}
											onClick={() => confirm('restore')}
										>
											{texts.restore}
										</Button>
									</Space>
								</section>

								<section className="setup-section">
									<Typography.Title level={5}>{texts.mods}</Typography.Title>
									{mods.length === 0
										? <Typography.Text type="secondary">{texts.noMods}</Typography.Text>
										: (
											<div className="setup-mods">
												{mods.map(mod => (
													<div key={mod.name} className="setup-mod">
														<Typography.Text ellipsis={{ tooltip: mod.path }}>
															{mod.name}
														</Typography.Text>
														<Space size={2}>
															<Button
																type="text"
																size="small"
																icon={<SaveOutlined />}
																title={texts.updateMod}
																onClick={() => void updateMod(mod)}
															/>
															<Button
																type="text"
																size="small"
																danger
																icon={<DeleteOutlined />}
																title={texts.removeMod}
																onClick={() => void removeMod(mod.name)}
															/>
														</Space>
													</div>
												))}
											</div>
										)}
									<Space wrap>
										<Button type="primary" loading={busy === 'mods'} onClick={() => void addMods()}>
											{texts.addMod}
										</Button>
										<Button loading={busy === 'mods'} onClick={() => void syncMods()}>
											{texts.syncMods}
										</Button>
									</Space>
								</section>

								<section className="setup-section">
									<Typography.Title level={5}>{texts.options}</Typography.Title>
									<div className="setup-option">
										<Switch
											checked={config.useMods ?? true}
											onChange={value => void toggle('useMods', value)}
										/>
										<Typography.Text>{texts.useMods}</Typography.Text>
									</div>
									<div className="setup-option">
										<Switch
											checked={config.advancedMode ?? false}
											onChange={value => void toggle('advancedMode', value)}
										/>
										<Typography.Text>{texts.advancedMode}</Typography.Text>
									</div>
									<div className="setup-option">
										<Switch
											checked={paths.mode === 'portable'}
											disabled={paths.mode === 'dev' || busy === 'mode'}
											onChange={value => confirmMode(value)}
										/>
										<Typography.Text>{texts.portableMode}</Typography.Text>
									</div>
									<div className="setup-option">
										<Typography.Text>{texts.language}</Typography.Text>
										<Select
											className="setup-language"
											value={config.lang}
											options={[
												{ label: 'Русский', value: 'RU' },
												{ label: 'English', value: 'EN' },
												{ label: 'Deutsch', value: 'DE' },
												{ label: '中文', value: 'CH' }
											]}
											onChange={value => void changeLang(value)}
										/>
									</div>
								</section>
							</Space>
						)}
			</div>
		</div>
	)
}

/** Название режима хранения данных. */
function modeText(mode: PathsDto['mode']): string {
	switch (mode) {
		case 'portable': return texts.modePortable
		case 'dev': return texts.modeDev
		default: return texts.modeInstalled
	}
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
