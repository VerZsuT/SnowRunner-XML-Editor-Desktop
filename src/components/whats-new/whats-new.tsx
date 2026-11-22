import { useConfig } from '@/config'
import { LOCALES } from '@/utilities/localization'
import { Button, Modal } from 'antd'
import { VersionInfo } from './version-info'
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
	// Тексты читаются из состояния: смена языка видна без перезагрузки.
	const texts = LOCALES[config.lang].whatsNew
	const version = config.version ? ` ${config.version}` : ''

	return (
		<Modal
			open={open}
			title={`${texts.title}${version}`}
			onCancel={() => onOpenChange(false)}
			footer={(
				<Button type="primary" onClick={() => onOpenChange(false)}>
					Ok
				</Button>
			)}
		>
			<div className="whats-new-container">
				<VersionInfo changes={texts.changes} />
			</div>
		</Modal>
	)
}
