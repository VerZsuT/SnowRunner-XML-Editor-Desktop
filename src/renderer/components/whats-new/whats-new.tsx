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
			'Обновлены компоненты программы',
			'Добавлены картинки новых авто',
			'Обновлены стандартные параметры'
		])
		.en([
			'Updated program components',
			'Added pictures of new cars',
			'Standard parameters have been updated'
		])
		.de([
			'Programmkomponenten wurden aktualisiert',
			'Neue Autobilder hinzugefügt',
			'Standardeinstellungen wurden aktualisiert'
		])
		.ch([
			'更新的程序组件',
			'新增新车图片',
			'标准参数已更新'
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
