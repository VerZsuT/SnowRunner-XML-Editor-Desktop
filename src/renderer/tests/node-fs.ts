import { fsService, toResult, toSyncResult } from '@modules/files/service'
import type { FsResult, IFs } from '@modules/files/types'

/** Файловая система поверх node:fs для тестов renderer процесса. */
export class NodeFs implements IFs {
	list(path: string) {
		return toResult(path, () => fsService.list(path))
	}

	scan(path: string, args: Parameters<IFs['scan']>[1]) {
		return toResult(path, () => fsService.scan(path, args))
	}

	scanMany(paths: string[], args: Parameters<IFs['scan']>[1]) {
		return toResult(paths[0] ?? '', () => fsService.scanMany(paths, args))
	}

	stat(path: string) {
		return toResult(path, () => fsService.stat(path))
	}

	statMany(paths: string[]) {
		return toResult(paths[0] ?? '', () => fsService.statMany(paths))
	}

	readFile(path: string, encoding?: BufferEncoding) {
		return toResult(path, () => fsService.readFile(path, encoding))
	}

	readMany(paths: string[], encoding?: BufferEncoding) {
		return toResult(paths[0] ?? '', () => fsService.readMany(paths, encoding))
	}

	writeFile(path: string, data: string) {
		return toResult(path, () => fsService.writeFile(path, data))
	}

	writeMany(items: Array<{ path: string; data: string }>) {
		return toResult('', () => fsService.writeMany(items))
	}

	makeDir(path: string) {
		return toResult(path, () => fsService.makeDir(path))
	}

	remove(path: string) {
		return toResult(path, () => fsService.remove(path))
	}

	move(from: string, to: string) {
		return toResult(from, () => fsService.move(from, to))
	}

	copy(from: string, to: string) {
		return toResult(from, () => fsService.copy(from, to))
	}

	chmod(path: string, mode: number) {
		return toResult(path, () => fsService.chmod(path, mode))
	}

	watch(path: string): FsResult<string> {
		return toSyncResult(path, () => fsService.watch(path))
	}

	unwatch(id: string): FsResult<void> {
		return toSyncResult(id, () => fsService.unwatch(id))
	}
}
