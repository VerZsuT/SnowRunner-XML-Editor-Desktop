import { LocalizationStrings } from '@localization'
import { useConfig } from '@renderer/utilities/use-reactive'
import { di } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Modal } from 'antd'
import { VersionInfo } from './version-info'
import { WHATS_NEW_LOCALIZATION as texts } from './localization'
import './whats-new.scss'

/** Параметры окна "Что нового". */
export interface WhatsNewProps {
	/** Открыто ли окно. */
	open: boolean

	/** Изменить состояние окна. */
	onOpenChange(open: boolean): void
}

/** Окно "Что нового". */
export function WhatsNew({ open, onOpenChange }: WhatsNewProps) {
	const config = useConfig()
	const appConstants = di.resolve(APP_CONSTANTS_TOKEN)
	const info = new LocalizationStrings<string[]>()
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

	return (
		<Modal
			open={open}
			title={`${texts.whatsNewTitle} ${appConstants.VERSION}`}
			onCancel={() => onOpenChange(false)}
			footer={(
				<Button key="submit" type="primary" onClick={() => onOpenChange(false)}>
					Ok
				</Button>
			)}
		>
			<div className="whats-new-container">
				<VersionInfo changes={info} />
			</div>
		</Modal>
	)
}
