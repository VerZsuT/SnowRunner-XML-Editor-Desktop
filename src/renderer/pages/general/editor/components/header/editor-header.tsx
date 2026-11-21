import type { IFile } from '@modules/files/types'
import type { TruckXML } from '@modules/xml/renderer'
import { Typography } from 'antd'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import { ErrorHeader } from './error-header'
import { MainHeader } from './main-header'
import type { MainHeaderHandle } from './main-header'

const { Text } = Typography

/** Параметры заголовка редактора. */
export interface EditorHeaderProps {
	/** XML файла. */
	xml?: TruckXML | null

	/** Файл. */
	file?: IFile | null

	/** Имеется ли ошибка. */
	hasError: boolean
}

/** Методы заголовка редактора. */
export interface EditorHeaderHandle {
	save(updateFiles?: boolean): Promise<void>
	reset(): Promise<void>
	import(toImport?: IFile): Promise<void>
	export(toExport?: IFile): Promise<void>
}

/** Заголовок редактора. */
export const EditorHeader = forwardRef<EditorHeaderHandle, EditorHeaderProps>(function EditorHeader({ xml, file, hasError }, ref) {
	const headerRef = useRef<MainHeaderHandle>(null)

	useImperativeHandle(ref, () => ({
		async save(updateFiles = true) {
			await headerRef.current?.save(updateFiles)
		},
		async reset() {
			await headerRef.current?.reset()
		},
		async import(toImport?: IFile) {
			await headerRef.current?.import(toImport)
		},
		async export(toExport?: IFile) {
			await headerRef.current?.export(toExport)
		}
	}), [])

	return (
		<header>
			{hasError
				? (
					<>
						<ErrorHeader />
						<div className="error-container">
							<Text>{texts.procFileError}</Text>
						</div>
					</>
				)
				: xml && file
					? <MainHeader ref={headerRef} xml={xml} file={file} />
					: null}
		</header>
	)
})
