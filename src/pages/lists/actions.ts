import type { DocumentClient } from '@/api/documents'
import { DocumentSession, documentClient } from '@/api/documents'
import { open as openDialog, save as saveDialog } from '@tauri-apps/plugin-dialog'

/** Файл, над которым выполняется действие списка. */
export interface VehicleTarget {
	/** Имя файла без расширения. */
	name: string

	/** Вид документа. */
	kind: 'truck' | 'trailer'

	/** Мод, из которого взят файл. */
	modName: string | null
}

/** Действия контекстного меню списка. */
export interface VehicleActions {
	/** Экспортирует параметры в `.epf`; `null` — пользователь отменил выбор файла. */
	export(target: VehicleTarget): Promise<number | null>

	/** Импортирует параметры из `.epf` и записывает файл; `null` — отмена. */
	import(target: VehicleTarget): Promise<number | null>

	/** Сбрасывает правки файла и записывает его заново. */
	reset(target: VehicleTarget): Promise<void>
}

/**
 * Открывает документ на время действия: сессия не нужна списку после возврата.
 * @param target Файл списка.
 * @param client Клиент команд.
 * @returns Сессия документа.
 */
function open(target: VehicleTarget, client: DocumentClient): Promise<DocumentSession> {
	return DocumentSession.open(target.kind, target.name, client, target.modName)
}

/** Действия через ядро: файл меняется на диске только импортом и сбросом. */
export function createVehicleActions(client: DocumentClient = documentClient): VehicleActions {
	return {
		async export(target) {
			const path = await saveDialog({
				defaultPath: `${target.name}.epf`,
				filters: [{ name: 'EPF', extensions: ['epf'] }]
			})

			if (!path) {
				return null
			}

			const session = await open(target, client)

			try {
				return (await session.exportEpf(path)).attributes
			} finally {
				await session.close(true).catch(() => false)
			}
		},

		async import(target) {
			const path = await openDialog({
				multiple: false,
				directory: false,
				filters: [{ name: 'EPF', extensions: ['epf'] }]
			})

			if (typeof path !== 'string') {
				return null
			}

			const session = await open(target, client)

			try {
				const report = await session.importEpf(path)

				await session.save()

				return report.attributes
			} finally {
				await session.close(true).catch(() => false)
			}
		},

		async reset(target) {
			const session = await open(target, client)

			try {
				await session.reset()
				await session.save()
			} finally {
				await session.close(true).catch(() => false)
			}
		}
	}
}

/** Действия по умолчанию. */
export const vehicleActions = createVehicleActions()
