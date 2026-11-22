import { LocalizationStrings } from '@localization'
import { useConfig } from '@renderer/config'
import { Button, Modal } from 'antd'
import { VersionInfo } from './version-info'
import { WHATS_NEW_LOCALIZATION as texts } from './localization'
import './whats-new.scss'

/** Параметры окна «Что нового». */
export interface WhatsNewProps {
	/** Открыто ли окно. */
	open: boolean

	/** Изменить состояние окна. */
	onOpenChange(open: boolean): void
}

/** Окно «Что нового» с изменениями текущей версии. */
export function WhatsNew({ open, onOpenChange }: WhatsNewProps) {
	const config = useConfig()
	const changes = new LocalizationStrings<string[]>()
		.ru([
			'Программа переведена на Tauri (Rust): меньше размер и потребление памяти',
			'Портативная версия поставляется в архиве .zip',
			'Нужны Windows 10 или 11 (x64) и WebView2'
		])
		.en([
			'The program is moved to Tauri (Rust): smaller size and memory usage',
			'The portable version is shipped as a .zip archive',
			'Windows 10 or 11 (x64) and WebView2 are required'
		])
		.de([
			'Das Programm läuft jetzt auf Tauri (Rust): kleiner und sparsamer',
			'Die portable Version wird als .zip-Archiv geliefert',
			'Erfordert Windows 10 oder 11 (x64) und WebView2'
		])
		.ch([
			'程序已迁移到 Tauri（Rust）：体积更小、内存占用更低',
			'便携版以 .zip 压缩包提供',
			'需要 Windows 10 或 11（x64）和 WebView2'
		])
		.get(config)
	const version = config.version ? ` ${config.version}` : ''

	return (
		<Modal
			open={open}
			title={`${texts.whatsNewTitle}${version}`}
			onCancel={() => onOpenChange(false)}
			footer={(
				<Button type="primary" onClick={() => onOpenChange(false)}>
					Ok
				</Button>
			)}
		>
			<div className="whats-new-container">
				<VersionInfo changes={changes} />
			</div>
		</Modal>
	)
}
