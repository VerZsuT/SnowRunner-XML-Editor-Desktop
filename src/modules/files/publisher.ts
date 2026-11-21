import { emitEvent, publishFunction } from 'emr-bridge/main'
import { fsService, toResult, toSyncResult } from './service'

/** Имя класса файловой системы в мосте. */
const CLASS_NAME = 'Fs'

/** Событие наблюдения за файлом. */
const WATCH_EVENT = 'Fs/watch'

/** Опубликовать файловую систему main процесса. */
export function publishFiles() {
	fsService.setWatcherEvents(event => emitEvent(WATCH_EVENT, event))

	publishFunction(`${CLASS_NAME}/list`, (path: string) => toResult(path, () => fsService.list(path)))
	publishFunction(`${CLASS_NAME}/scan`, (path: string, args: Parameters<typeof fsService.scan>[1]) => (
		toResult(path, () => fsService.scan(path, args))
	))
	publishFunction(`${CLASS_NAME}/stat`, (path: string) => toResult(path, () => fsService.stat(path)))
	publishFunction(`${CLASS_NAME}/readFile`, (path: string, encoding?: BufferEncoding) => (
		toResult(path, () => fsService.readFile(path, encoding))
	))
	publishFunction(`${CLASS_NAME}/readMany`, (paths: string[], encoding?: BufferEncoding) => (
		toResult(paths[0] ?? '', () => fsService.readMany(paths, encoding))
	))
	publishFunction(`${CLASS_NAME}/writeFile`, (path: string, data: string) => (
		toResult(path, () => fsService.writeFile(path, data))
	))
	publishFunction(`${CLASS_NAME}/writeMany`, (items: Array<{ path: string; data: string }>) => (
		toResult('', () => fsService.writeMany(items))
	))
	publishFunction(`${CLASS_NAME}/makeDir`, (path: string) => toResult(path, () => fsService.makeDir(path)))
	publishFunction(`${CLASS_NAME}/remove`, (path: string) => toResult(path, () => fsService.remove(path)))
	publishFunction(`${CLASS_NAME}/move`, (from: string, to: string) => toResult(from, () => fsService.move(from, to)))
	publishFunction(`${CLASS_NAME}/copy`, (from: string, to: string) => toResult(from, () => fsService.copy(from, to)))
	publishFunction(`${CLASS_NAME}/chmod`, (path: string, mode: number) => (
		toResult(path, () => fsService.chmod(path, mode))
	))
	publishFunction(`${CLASS_NAME}/watch`, (path: string) => toSyncResult(path, () => fsService.watch(path)))
	publishFunction(`${CLASS_NAME}/unwatch`, (id: string) => toSyncResult(id, () => fsService.unwatch(id)))
}
