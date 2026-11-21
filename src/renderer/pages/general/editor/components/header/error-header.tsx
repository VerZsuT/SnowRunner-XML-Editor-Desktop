import { MenuOutlined, SaveOutlined } from '@ant-design/icons'
import { Page } from '@modules/windows/enums'
import { Header } from '@renderer/components/header'
import { usePageStore } from '@renderer/pages/general/store/page'
import { useConfig } from '@renderer/utilities/use-reactive'
import { Button, Dropdown, Tooltip } from 'antd'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import { useFilesMenuItems } from '../files-menu/files-menu'

/** Заголовок редактора при ошибке загрузки файла. */
export function ErrorHeader() {
	const configState = useConfig()
	const route = usePageStore(state => state.route)
	const filesMenuItems = useFilesMenuItems()

	return (
		<Header
			text={texts.error}
			withBack
			onBack={() => route(Page.lists)}
			extra={(
				<>
					<Dropdown
						className="menu-button"
						trigger={['click']}
						menu={{ items: configState.advancedMode ? filesMenuItems : [] }}
					>
						<span className="menu-button">
							<MenuOutlined style={{ fontSize: 25 }} />
						</span>
					</Dropdown>
					<Tooltip key="save" title={texts.saveButton}>
						<Button
							id="save"
							className="menu-save-button"
							type="text"
							shape="circle"
							disabled
							icon={<SaveOutlined style={{ fontSize: 25 }} />}
						/>
					</Tooltip>
				</>
			)}
		/>
	)
}
