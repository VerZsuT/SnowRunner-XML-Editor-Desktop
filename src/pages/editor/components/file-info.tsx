import { FileTextOutlined } from '@ant-design/icons'
import type { DocumentSession } from '@/api/documents'
import { openPath } from '@/api/system'
import { useConfig } from '@/config'
import { App } from 'antd'
import { texts } from '../texts'
import './file-info.scss'

/** Кликабельное имя файла: открывает его в редакторе системы по умолчанию. */
export function FileInfo({ session }: { session: DocumentSession }) {
	const advanced = useConfig().advancedMode
	const { message } = App.useApp()

	if (!advanced) {
		return null
	}

	const name = fileName(session.path) ?? session.archiveName

	function open() {
		void openPath(session.path).catch((reason: unknown) => {
			message.error(reason instanceof Error ? reason.message : String(reason))
		})
	}

	return (
		<button
			type="button"
			className="editor-file-info"
			title={texts.openFile}
			aria-label={`${texts.openFile}: ${name}`}
			onClick={open}
		>
			<FileTextOutlined />
			<span>{name}</span>
		</button>
	)
}

/** Имя файла с расширением. */
function fileName(path: string): string | undefined {
	return path.split(/[\\/]/).pop()
}
