import type { IFile } from '@modules/files/renderer'
import type { FileInfo, Gearboxes as GearboxesXML } from '@modules/xml/renderer'
import { hasItems } from '@utilities/checks/renderer'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useEditorStore } from '../../../../store/editor'
import { useFilesReg, useFilesWatch } from '../../../utilities/files'
import { FileNameInfo } from '../../info/file-name-info'
import type { ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import { GearboxSet } from './set'

/** Параметры списка коробок передач. */
export type GearboxesProps = ReadyProps & {
	/** Геттер коробок передач. */
	getter?(info: FileInfo): Promise<GearboxesXML[]>

	/** Геттер файлов. */
	filesGetter?(info: FileInfo): Promise<IFile[]>
}

/** Список коробок передач. */
export function Gearboxes({ getter, filesGetter, onReady, onMount }: GearboxesProps) {
	const info = useEditorStore(state => state.info)
	const [list, setList] = useState<GearboxesXML[]>([])
	const [files, setFiles] = useState<IFile[]>([])
	const [reloadToken, setReloadToken] = useState(0)
	const { ready, inProgress } = useFilesReady({ onReady, onMount, dynamic: true })
	const onReadyRef = useRef(onReady)

	onReadyRef.current = onReady

	useFilesReg(files, 'gearboxes')
	useFilesWatch(files, update)

	useEffect(() => {
		let cancelled = false

		void init()

		return () => {
			cancelled = true
		}

		async function init() {
			const foundFiles = await filesGetter?.(info) ?? []
			const foundList = await getter?.(info) ?? []

			if (cancelled) {
				return
			}

			if (!hasItems(foundFiles) || !hasItems(foundList)) {
				onReadyRef.current?.()
			}

			setFiles(foundFiles)
			setList(foundList)
		}
	}, [info, getter, filesGetter, reloadToken])

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
						<GearboxSet
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
