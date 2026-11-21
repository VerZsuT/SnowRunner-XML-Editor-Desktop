import type { IFile } from '@modules/files/renderer'
import type { Engines as EnginesXML, FileInfo } from '@modules/xml/renderer'
import { hasItems } from '@utilities/checks/renderer'
import { useLatestRef } from '@renderer/utilities/use-latest-ref'
import { Fragment, useEffect, useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import { useFilesReg, useFilesWatch } from '../../../utilities/files'
import { FileNameInfo } from '../../info/file-name-info'
import type { ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import { EngineSet } from './set'

/** Параметры списка двигателей. */
export type EnginesProps = ReadyProps & {
	/** Геттер двигателей. */
	getter?(info: FileInfo, files?: IFile[]): Promise<EnginesXML[]>

	/** Геттер файлов. */
	filesGetter?(info: FileInfo): Promise<IFile[]>
}

/** Список двигателей. */
export function Engines({ getter, filesGetter, onReady, onMount }: EnginesProps) {
	const info = useEditorStore(state => state.info)
	const [list, setList] = useState<EnginesXML[]>([])
	const [files, setFiles] = useState<IFile[]>([])
	const [reloadToken, setReloadToken] = useState(0)
	const { ready, inProgress } = useFilesReady({ onReady, onMount, dynamic: true })
	const onReadyRef = useLatestRef(onReady)

	useFilesReg(files, 'engines')
	useFilesWatch(files, update)

	useEffect(() => {
		let cancelled = false

		void init()

		return () => {
			cancelled = true
		}

		async function init() {
			const foundFiles = await filesGetter?.(info) ?? []
			const foundList = await getter?.(info, filesGetter ? foundFiles : undefined) ?? []

			if (cancelled) {
				return
			}

			if (!hasItems(foundFiles) || !hasItems(foundList)) {
				onReadyRef.current?.()
			}

			setFiles(foundFiles)
			setList(foundList)
		}
	}, [info, getter, filesGetter, reloadToken, onReadyRef])

	function update() {
		setFiles([])
		setList([])
		setReloadToken(token => token + 1)
	}

	return (
		<>
			{list.map((xml, i) => {
				const file = files[i]

				if (!file) {
					return null
				}

				return (
					<Fragment key={file.path}>
						<FileNameInfo file={file} />
						<EngineSet
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
