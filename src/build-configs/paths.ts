/** Пути в программе */
class Paths {
  /** Путь до папки `src` */
  readonly src = './src'
  /** Путь до папки проекта */
  readonly root = '.'

  /** Путь до картинок */
  readonly images = `${this.src}/images`
  /** Путь до иконки */
  readonly favicon = `${this.src}/images/favicon.ico`
  
  /** Путь до WinRAR файлов */
  readonly winrar = `${this.src}/modules/archive/main/archiver/files`
  /** Путь до `LICENSE` */
  readonly license = `${this.root}/LICENSE`
  /** Путь до `README` */
  readonly readme = `${this.root}/README.md`
}

export default new Paths()
