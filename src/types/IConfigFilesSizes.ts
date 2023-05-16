interface IConfigFilesSizes {
  initial: number
  mods: {
    [fileName: string]: number
  }
}

export default IConfigFilesSizes
