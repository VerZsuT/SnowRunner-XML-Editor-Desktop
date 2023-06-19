export default interface IConfigFilesSizes {
  initial: number
  mods: {
    [fileName: string]: number
  }
}
