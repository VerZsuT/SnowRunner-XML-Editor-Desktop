import { CloudDownloadOutlined, DownOutlined } from '@ant-design/icons'
import { di } from '@utilities/di/container'
import { CHECKS_TOKEN, CONFIG_TOKEN, UPDATES_TOKEN } from '@utilities/di/renderer/tokens'
import { Alert, Button, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_LOCALIZATION as texts } from './localization'
import './update.scss'

/** Уведомление об обновлении программы. */
export function Update() {
	const checks = di.resolve(CHECKS_TOKEN)
	const [version, setVersion] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		let cancelled = false

		void (async () => {
			const newVersion = await checks.checkUpdate() ?? ''

			if (!cancelled) {
				setVersion(newVersion)
				setIsOpen(Boolean(newVersion))
			}
		})()

		return () => {
			cancelled = true
		}
	}, [checks])

	const onUpdateClick: MenuProps['onClick'] = ({ key }) => {
		if (!version) {
			return
		}

		const updates = di.resolve(UPDATES_TOKEN)

		void updates.updateApp(version, key === 'portable')
		setIsOpen(false)
	}

	function onIgnoreClick() {
		const config = di.resolve(CONFIG_TOKEN)

		config.checkUpdates = false
		setIsOpen(false)
	}

	const menuItems: MenuProps['items'] = [
		{ key: 'installer', label: texts.installer },
		{ key: 'portable', label: texts.portable }
	]

	if (!isOpen) {
		return null
	}

	return (
		<Alert
			className="update-alert"
			message={texts.title}
			description={`${texts.allowNewVersion} (v${version})`}
			type="info"
			showIcon
			closable
			onClose={() => setIsOpen(false)}
			icon={<CloudDownloadOutlined />}
			action={(
				<Space direction="vertical" className="buttons">
					<Dropdown menu={{ items: menuItems, onClick: onUpdateClick }}>
						<Button size="small" type="primary">
							{texts.update}
							<DownOutlined />
						</Button>
					</Dropdown>
					<Button
						size="small"
						type="primary"
						danger
						onClick={onIgnoreClick}
					>
						{texts.ignore}
					</Button>
				</Space>
			)}
		/>
	)
}
