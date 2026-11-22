import { FileFilled, FolderFilled } from '@ant-design/icons'
import type { Config } from '@/api/bindings'
import { Header } from '@/components/header'
import { applyConfig, fromConfigDto, useConfig } from '@/config'
import { Lang, LOCALES } from '@/utilities/localization'
import { formatString } from '@/utilities/strings'
import { open } from '@tauri-apps/plugin-dialog'
import { App as AntApp, Button, Result, Segmented, Steps, Typography } from 'antd'
import { useEffect, useState } from 'react'
import type { WelcomeClient } from './client'
import { welcomeClient } from './client'
import './welcome.scss'

/** Задержка перед перезагрузкой, чтобы пользователь увидел итог распаковки. */
const RELOAD_DELAY = 600

/** Языки интерфейса в порядке выбора. */
const LANGUAGES: { label: string, value: Lang }[] = [
	{ label: 'RU', value: Lang.ru },
	{ label: 'EN', value: Lang.en },
	{ label: 'DE', value: Lang.de },
	{ label: 'CH', value: Lang.ch }
]

/** Параметры экрана первоначальной настройки. */
export interface WelcomePageProps {
	/** Клиент команд: подменяется в тестах. */
	client?: WelcomeClient
}

/**
 * Экран первоначальной настройки: язык программы и игровые данные.
 *
 * Показывается, пока не распакованы файлы игры. Язык применяется сразу:
 * тексты берутся из {@link LOCALES} по выбранному языку, а остальной интерфейс
 * получит его после перезагрузки окна.
 */
export function WelcomePage({ client = welcomeClient }: WelcomePageProps) {
	const config = useConfig()
	const { message } = AntApp.useApp()
	const [lang, setLang] = useState(config.lang)
	const [step, setStep] = useState(config.initialPath ? 1 : 0)
	const [saved, setSaved] = useState<Config | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [busy, setBusy] = useState<'folder' | 'file' | null>(null)
	const texts = LOCALES[lang].welcome

	useEffect(() => {
		let cancelled = false

		client.config().then(
			value => {
				if (!cancelled) {
					setSaved(value)
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

	async function changeLang(value: Lang) {
		setLang(value)

		try {
			const next = await client.saveConfig({ ...(saved ?? await client.config()), lang: value })

			setSaved(next)
			applyConfig(fromConfigDto(next))
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function chooseFolder() {
		const folder = await open({ multiple: false, directory: true })

		if (typeof folder !== 'string') {
			return
		}

		try {
			const path = await client.findInitial(folder)

			if (!path) {
				message.error(texts.invalidFolder)

				return
			}

			await install(path, 'folder')
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function chooseFile() {
		const path = await open({
			multiple: false,
			directory: false,
			filters: [{ name: 'initial.pak', extensions: ['pak'] }]
		})

		if (typeof path === 'string') {
			await install(path, 'file')
		}
	}

	async function install(initialPath: string, action: 'folder' | 'file') {
		setBusy(action)

		try {
			const next = await client.saveConfig({
				...(saved ?? await client.config()),
				initialPath,
				// Первоначальная настройка заменяет окно «Что нового»: второй раз оно не нужно.
				openWhatsNew: false
			})

			setSaved(next)
			applyConfig(fromConfigDto(next))

			await client.backup(initialPath)

			const files = await client.unpack(initialPath)

			message.success(formatString(texts.unpacked, String(files)))
			setTimeout(() => client.reload(), RELOAD_DELAY)
		} catch (reason) {
			message.error(toMessage(reason))
			setBusy(null)
		}
	}

	return (
		<div className="welcome">
			<Header text={texts.title} />
			<div className="welcome-content">
				{error
					? (
						<Result
							status="error"
							title={texts.loadError}
							subTitle={error}
						/>
					)
					: (
						<>
							<Steps
								className="welcome-steps"
								current={step}
								items={[{ title: texts.language }, { title: texts.gameData }]}
							/>
							{step === 0
								? (
									<>
										<Segmented
											className="welcome-languages"
											size="large"
											value={lang}
											options={LANGUAGES}
											onChange={value => void changeLang(value as Lang)}
										/>
										<Button
											className="welcome-next"
											type="primary"
											onClick={() => setStep(1)}
										>
											{texts.next}
										</Button>
									</>
								)
								: (
									<>
										<Typography.Text type="secondary">{texts.hint}</Typography.Text>
										<div className="welcome-actions">
											<Button
												type="primary"
												size="large"
												icon={<FolderFilled />}
												loading={busy === 'folder'}
												disabled={busy !== null && busy !== 'folder'}
												onClick={() => void chooseFolder()}
											>
												{texts.gameFolder}
											</Button>
											<Button
												type="primary"
												size="large"
												icon={<FileFilled />}
												loading={busy === 'file'}
												disabled={busy !== null && busy !== 'file'}
												onClick={() => void chooseFile()}
											>
												{texts.initialFile}
											</Button>
										</div>
										{busy && <Typography.Text type="secondary">{texts.unpacking}</Typography.Text>}
									</>
								)}
						</>
					)}
			</div>
		</div>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
