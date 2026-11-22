import { T } from '@localization'
import { useConfig } from '@renderer/config'
import { Button, Modal } from 'antd'
import { VersionInfo } from './version-info'
import './whats-new.scss'

/** Тексты окна. */
const texts = T.whatsNew

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
