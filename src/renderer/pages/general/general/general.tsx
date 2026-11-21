import type { IFile } from '@modules/files/renderer'
import { Page, ProgramWindow } from '@modules/windows/enums'
import { LoadingPage } from '@renderer/components/loading-page'
import { Menu } from '@renderer/components/menu'
import { useConfig, useLoadingState } from '@renderer/utilities/use-reactive'
import { useWindowReady } from '@renderer/utilities/use-window-ready'
import { hasItems } from '@utilities/checks/renderer'
import { di } from '@utilities/di/container'
import { CHECKS_TOKEN, DIRS_TOKEN, DLC_TOKEN, EDITED_TOKEN, FILES_TOKEN, FS_TOKEN, SYSTEM_TOKEN, WINDOWS_TOKEN } from '@utilities/di/renderer/tokens'
import { useEffect, useRef, useState } from 'react'
import { Editor } from '../editor'
import { Lists } from '../lists'
import { editorUtils } from '../lists/utilities/editor'
import { useEditorStore } from '../store/editor'
import { usePageStore } from '../store/page'
import { Setup } from '../setup'
import { Update } from '../update'
import { EditorActions } from './editor-actions'
import { GameUpdate } from './game-update'
import { GENERAL_LOCALIZATION as texts } from './localization'
import './general.scss'

/** Общая страница программы. */
export function General() {
	// Подписка на конфигурацию: при смене языка перерисовывается всё дерево.
	useConfig()
	const loadingState = useLoadingState()
	const page = usePageStore(state => state.page)
	const route = usePageStore(state => state.route)
	const setShowMessages = useEditorStore(state => state.setShowMessages)
	const [gameUpdateOpened, setGameUpdateOpened] = useState(false)
	const initializedRef = useRef(false)

	useWindowReady(ProgramWindow.general)

	useEffect(() => {
		const windows = di.resolve(WINDOWS_TOKEN)

		return windows.onRoute(route)
	}, [route])

	useEffect(() => {
		if (loadingState.isLoading || initializedRef.current) {
			return
		}

		initializedRef.current = true

		const checks = di.resolve(CHECKS_TOKEN)
		const edited = di.resolve(EDITED_TOKEN)
		const dirs = di.resolve(DIRS_TOKEN)
		const files = di.resolve(FILES_TOKEN)

		void checks.checkUpdate()

		const timeout = setTimeout(async () => {
			if (hasItems(edited)
				&& await dirs.backupInitialData.exists()
				&& !await files.editedFlag.exists()
			) {
				setGameUpdateOpened(true)
			}
		}, 2000)

		return () => clearTimeout(timeout)
	}, [loadingState.isLoading])

	useEffect(() => {
		// Отладочный хук не должен попадать в prod-сборку.
		if (!import.meta.env.DEV) {
			return
		}

		window['exportDefaults'] = exportDefaults

		return () => {
			delete window['exportDefaults']
		}
		// Намеренно один раз.
	}, [])

	async function exportDefaults() {
		const dlcs = di.resolve(DLC_TOKEN)
		const files = di.resolve(FILES_TOKEN)
		const dirs = di.resolve(DIRS_TOKEN)
		const fs = di.resolve(FS_TOKEN)
		const filesToExport: IFile[] = []
		const folders = ['trucks', 'trucks/trailers']

		const dlcRoots = [...dlcs].flatMap(dlc => folders.map(folder => dlc.dir.dir('classes').dir(folder)))
		const dlcFiles = await fs.scanMany(dlcRoots.map(root => root.path), { ext: 'xml' })

		if (dlcFiles.ok) {
			filesToExport.push(...dlcFiles.value.map(entry => files.newFile(entry.path)))
		}

		for (const postfix of folders) {
			filesToExport.push(...await dirs.classes.dir(postfix).findFiles({ ext: 'xml' }))
		}

		setShowMessages(false)

		let count = 0

		await editorUtils.export(
			filesToExport.map(file => ({ source: file, toExport: files.exported })),
			() => console.log(count++)
		)

		setShowMessages(true)

		if (await files.exported.exists()) {
			const system = di.resolve(SYSTEM_TOKEN)

			console.log(texts.exported)
			await system.openFile(files.exported.path)
		} else {
			console.error(texts.exportError)
		}
	}

	return (
		<>
			<LoadingPage />

			{!loadingState.isLoading && (
				<>
					<Menu />
					<EditorActions />
					<Update />
					<GameUpdate open={gameUpdateOpened} onOpenChange={setGameUpdateOpened} />

					{page === Page.setup && <Setup />}
					{page !== Page.none && (
						<div className="page-container" style={{ display: page === Page.lists ? undefined : 'none' }}>
							<Lists />
						</div>
					)}
					{page === Page.editor && <Editor />}
				</>
			)}
		</>
	)
}
