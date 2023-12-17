class Paths {
  readonly src = './src'
  readonly root = '.'

  readonly images = `${this.src}/images`
  readonly favicon = `${this.src}/images/favicon.ico`
  readonly bundledFavicon = `${this.root}/.vite/favicon.ico`

  readonly winrar = `${this.src}/modules/archive/main/archiver/files`
  readonly license = `${this.root}/LICENSE`
  readonly readme = `${this.root}/README.md`
}

export default new Paths()
