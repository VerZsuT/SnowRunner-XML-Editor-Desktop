import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizePath } from 'vite'

/** Папка, в которой находится текущий исполняемый скрипт. */
const _dirname = dirname(fileURLToPath(import.meta.url))

/** Пути в программе. */
class Paths {
	/** Папка с исходниками. */
	readonly src = normalizePath(resolve(_dirname, '..'))

	/** Папка проекта. */
	readonly root = normalizePath(resolve(this.src, '..'))

	/** Папка с картинками. */
	readonly images = normalizePath(resolve(this.src, './images'))

	/** Иконка. */
	readonly favicon = normalizePath(resolve(this.images, './favicon.ico'))

	/** Папка с WinRAR. */
	readonly winrar = normalizePath(resolve(this.src, './modules/archiver/main/archiver/files'))

	/** Файл лицензии. */
	readonly license = normalizePath(resolve(this.root, './LICENSE'))

	/** Файл README. */
	readonly readme = normalizePath(resolve(this.root, './README.md'))
}

export const paths = new Paths()
