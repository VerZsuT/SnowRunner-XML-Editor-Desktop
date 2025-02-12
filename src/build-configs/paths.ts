/** Пути в программе. */
class Paths {
	/** Папка с исходниками. */
	public readonly src = './src'

	/** Папка проекта. */
	public readonly root = '.'

	/** Папка с картинками. */
	public readonly images = `${this.src}/images`

	/** Иконка. */
	public readonly favicon = `${this.src}/images/favicon.ico`
	
	/** Папка с WinRAR. */
	public readonly winrar = `${this.src}/modules/archive/main/archiver/files`

	/** Файл лицензии. */
	public readonly license = `${this.root}/LICENSE`

	/** Файл README. */
	public readonly readme = `${this.root}/README.md`
}

export default new Paths()
