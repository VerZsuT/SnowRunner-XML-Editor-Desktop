import { describe, expect, it, vi } from 'vitest'

/** Команды и события Tauri: подменяются до импорта модуля документов. */
const mocks = vi.hoisted(() => ({
	watch: vi.fn(async (_paths: string[]) => ({ status: 'ok' as const, data: null })),
	listen: vi.fn(async (_handler: (event: unknown) => void) => () => {})
}))

vi.mock('@/api/bindings', () => ({
	commands: { watchDocuments: mocks.watch },
	events: { documentsChanged: { listen: mocks.listen } }
}))

const { watchDocuments } = await import('@/api/documents')

/** Дать отработать отложенной очистке watcher. */
async function settle(): Promise<void> {
	await new Promise(resolve => setTimeout(resolve, 10))
}

describe('watchDocuments', () => {
	it('включает backend-watcher и выключает его после отписки', async () => {
		const stop = await watchDocuments(['C:/data/truck.xml'], () => {})

		expect(mocks.watch).toHaveBeenCalledWith(['C:/data/truck.xml'])
		expect(mocks.listen).toHaveBeenCalledTimes(1)

		stop()

		await settle()

		expect(mocks.watch).toHaveBeenLastCalledWith([])
	})

	it('не выключает watcher, пока наблюдает другой редактор', async () => {
		const first = await watchDocuments(['C:/data/a.xml'], () => {})
		const second = await watchDocuments(['C:/data/b.xml'], () => {})

		first()
		await settle()

		expect(mocks.watch).not.toHaveBeenLastCalledWith([])

		second()
		await settle()

		expect(mocks.watch).toHaveBeenLastCalledWith([])
	})
})
