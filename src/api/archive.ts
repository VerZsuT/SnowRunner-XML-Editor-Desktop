import type { ArchiveState, ArchiveStatusDto, RefreshResultDto } from './bindings'
import { commands, events } from './bindings'
import { CommandFailure, call } from './invoke'

export type { ArchiveState, ArchiveStatusDto, RefreshResultDto }

/** Распаковывает игровые файлы из `initial.pak`; возвращает число файлов. */
export async function unpackInitial(archivePath: string): Promise<number> {
	const result = await call(commands.unpackInitial(archivePath, 'optimized'))

	return result.files
}

/** Ищет `initial.pak` в выбранном каталоге игры; `null` — архив не найден. */
export async function findInitial(folder: string): Promise<string | null> {
	return call(commands.findInitial(folder))
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

/** Восстанавливает архив из бэкапа каталога данных. */
export async function restoreBackup(archivePath: string): Promise<void> {
	await call(commands.restoreBackup(archivePath))
}

/** Состояние архива относительно сохранённого отпечатка. */
export async function archiveStatus(): Promise<ArchiveStatusDto> {
	return call(commands.archiveStatus())
}

/** Перечитывает архив, сохраняя прежнюю распаковку в `backups/previous_initial`. */
export async function refreshArchive(): Promise<RefreshResultDto> {
	return call(commands.refreshArchive())
}

/** Подписывает на изменение состояния архива. */
export function onArchiveStatusChanged(
	handler: (state: ArchiveState) => void
): Promise<() => void> {
	return events.archiveStatusChanged.listen(event => handler(event.payload.state))
}

/** Ошибка означает, что архив изменился и запись в него запрещена. */
export function isArchiveChanged(reason: unknown): boolean {
	return reason instanceof CommandFailure && reason.code === 'archiveChanged'
}
