/** Пути в программе. */
class Paths {
	/** Папка с исходниками. */
	readonly src = './src'

	/** Папка проекта. */
	readonly root = '.'

	/** Папка с картинками. */
	readonly images = `${this.src}/images`

	/** Иконка. */
	readonly favicon = `${this.src}/images/favicon.ico`
	
	/** Папка с WinRAR. */
	readonly winrar = `${this.src}/modules/archive/main/archiver/files`

	/** Файл лицензии. */
	readonly license = `${this.root}/LICENSE`

	/** Файл README. */
	readonly readme = `${this.root}/README.md`
}

export default new Paths()
