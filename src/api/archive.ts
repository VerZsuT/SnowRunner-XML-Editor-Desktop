import { commands } from './bindings'
import { call } from './invoke'

/** Распаковывает игровые файлы из `initial.pak`; возвращает число файлов. */
export async function unpackInitial(archivePath: string): Promise<number> {
	const result = await call(commands.unpackInitial(archivePath, 'optimized'))

	return result.files
}

/** Делает бэкап архива; возвращает путь к копии. */
export async function backupArchive(archivePath: string): Promise<string> {
	return call(commands.backupArchive(archivePath, null))
}

/** Обновляет архив файлами из каталога данных; возвращает число записей. */
export async function updateArchive(archivePath: string, modName: string | null = null): Promise<number> {
	const result = await call(commands.updateArchive(archivePath, modName))

	return result.changed.length + result.added.length
}

/** Проверяет целостность архива; возвращает число записей. */
export async function verifyArchive(archivePath: string): Promise<number> {
	const result = await call(commands.verifyArchive(archivePath))

	return result.entries
}

/** Восстанавливает архив из бэкапа каталога данных. */
export async function restoreBackup(archivePath: string): Promise<void> {
	await call(commands.restoreBackup(archivePath))
}
