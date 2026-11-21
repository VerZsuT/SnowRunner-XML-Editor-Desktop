import type { IFile } from '@modules/files/renderer'
import type { FileInfo, Wheels as WheelsXML } from '@modules/xml/renderer'
import { hasItems } from '@utilities/checks/renderer'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import { useFilesReg, useFilesWatch } from '../../../utilities/files'
import { FileNameInfo } from '../../info/file-name-info'
import type { ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import { WheelSet } from './set'

/** Параметры списка наборов колёс. */
export type WheelsProps = ReadyProps & {
	/** Геттер набора колёс. */
	getter?(info: FileInfo, file?: IFile): Promise<WheelsXML | undefined>

	/** Геттер файла. */
	fileGetter?(info: FileInfo): Promise<IFile | undefined>
}

/** Список наборов колёс. */
export function Wheels({ getter, fileGetter, onReady, onMount }: WheelsProps) {
	const info = useEditorStore(state => state.info)
	const [wheelsSets, setWheelsSets] = useState<WheelsXML[]>([])
	const [files, setFiles] = useState<IFile[]>([])
	const [reloadToken, setReloadToken] = useState(0)
	const { ready, inProgress } = useFilesReady({ onReady, onMount, dynamic: true })
	const onReadyRef = useRef(onReady)

	onReadyRef.current = onReady

	useFilesReg(files, 'wheels')
	useFilesWatch(files, update)

	useEffect(() => {
		let cancelled = false

		void init()

		return () => {
			cancelled = true
		}

		async function init() {
			const file = await fileGetter?.(info)
			// Если файл уже искали и не нашли, повторный резолв внутри getter не нужен.
			const set = fileGetter
				? file ? await getter?.(info, file) : undefined
				: await getter?.(info)

			if (cancelled) {
				return
			}

			const foundFiles = file ? [file] : []
			const foundSets = set ? [set] : []

			if (!hasItems(foundFiles) || !hasItems(foundSets)) {
				onReadyRef.current?.()
			}

			setFiles(foundFiles)
			setWheelsSets(foundSets)
		}
	}, [info, getter, fileGetter, reloadToken])

	function update() {
		setFiles([])
		setWheelsSets([])
		setReloadToken(token => token + 1)
	}

	return (
		<>
			{files.map((file, i) => {
				const xml = wheelsSets[i]

				if (!xml) {
					return null
				}

				return (
					<Fragment key={file.path}>
						<FileNameInfo file={file} />
						<WheelSet
							xml={xml}
							file={file}
							onMount={() => inProgress(file.path)}
							onReady={() => ready(file.path)}
						/>
					</Fragment>
				)
			})}
		</>
	)
}
