import { emitEvent, publishFunction } from 'emr-bridge/main'
import { FS_METHODS, type FsMethod } from './types'
import { fsService, toResult, toSyncResult } from './service'

/** Имя класса файловой системы в мосте. */
const CLASS_NAME = 'Fs'

/** Событие наблюдения за файлом. */
const WATCH_EVENT = 'Fs/watch'

/** Обработчик метода файловой системы. */
type FsPublisher = (...args: any[]) => unknown

/** Обработчики всех методов файловой системы. */
const publishers: Record<FsMethod, FsPublisher> = {
	list: (path: string) => toResult(path, () => fsService.list(path)),
	scan: (path: string, args: Parameters<typeof fsService.scan>[1]) => (
		toResult(path, () => fsService.scan(path, args))
	),
	scanMany: (paths: string[], args: Parameters<typeof fsService.scan>[1]) => (
		toResult(paths[0] ?? '', () => fsService.scanMany(paths, args))
	),
	stat: (path: string) => toResult(path, () => fsService.stat(path)),
	statMany: (paths: string[]) => (
		toResult(paths[0] ?? '', () => fsService.statMany(paths))
	),
	readFile: (path: string, encoding?: BufferEncoding) => (
		toResult(path, () => fsService.readFile(path, encoding))
	),
	readMany: (paths: string[], encoding?: BufferEncoding) => (
		toResult(paths[0] ?? '', () => fsService.readMany(paths, encoding))
	),
	writeFile: (path: string, data: string) => (
		toResult(path, () => fsService.writeFile(path, data))
	),
	writeMany: (items: Array<{ path: string; data: string }>) => (
		toResult('', () => fsService.writeMany(items))
	),
	makeDir: (path: string) => toResult(path, () => fsService.makeDir(path)),
	remove: (path: string) => toResult(path, () => fsService.remove(path)),
	move: (from: string, to: string) => toResult(from, () => fsService.move(from, to)),
	copy: (from: string, to: string) => toResult(from, () => fsService.copy(from, to)),
	chmod: (path: string, mode: number) => (
		toResult(path, () => fsService.chmod(path, mode))
	),
	watch: (path: string) => toSyncResult(path, () => fsService.watch(path)),
	unwatch: (id: string) => toSyncResult(id, () => fsService.unwatch(id))
}

/** Опубликовать файловую систему main процесса. */
export function publishFiles() {
	fsService.setWatcherEvents(event => emitEvent(WATCH_EVENT, event))

	for (const method of FS_METHODS) {
		publishFunction(`${CLASS_NAME}/${method}`, (...args: any[]) => publishers[method](...args))
	}
}
