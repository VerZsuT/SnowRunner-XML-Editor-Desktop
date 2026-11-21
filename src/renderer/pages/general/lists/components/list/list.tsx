import { di } from '@utilities/di/container'
import { APP_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { SourceType } from '../../../enums'
import { getAllFiles, getSourceFiles, useListStore } from '../../../store/list'
import { LISTS_LOCALIZATION as texts } from '../../localization'
import { ModsPopup } from '../mods-popup'
import { ListItem } from './item'
import './list.scss'

/** Список элементов. */
export function List() {
	const category = useListStore(state => state.category)
	const source = useListStore(state => state.source)
	const files = useListStore(state => state.files)
	const [isShowMods, setIsShowMods] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const mountedRef = useRef(false)
	const allFiles = getAllFiles(files)
	const sourceFiles = getSourceFiles(files, source)

	useEffect(() => {
		if (!mountedRef.current) {
			mountedRef.current = true

			return
		}

		containerRef.current?.scrollTo?.({ top: 0 })
	}, [files])

	function hideModsPopup(isReload: boolean) {
		setIsShowMods(false)

		if (!isReload) {
			return
		}

		const app = di.resolve(APP_TOKEN)

		setTimeout(() => {
			Modal.confirm({
				okText: texts.ok,
				cancelText: texts.cancel,
				title: texts.relaunchPrompt,
				onOk: () => app.reload()
			})
		}, 200)
	}

	return (
		<div
			ref={containerRef}
			className="list"
		>
			{source === SourceType.mods && (
				<div className="mods-button-cont">
					<Button
						type="primary"
						className="mods-button"
						onClick={() => setIsShowMods(true)}
					>
						{texts.modsChangeButton}
					</Button>
				</div>
			)}
			<ModsPopup
				open={isShowMods}
				onHide={hideModsPopup}
			/>
			{allFiles.map(file => (
				<ListItem
					key={file.name}
					file={file}
					category={category}
					visible={sourceFiles.includes(file)}
				/>
			))}
		</div>
	)
}
