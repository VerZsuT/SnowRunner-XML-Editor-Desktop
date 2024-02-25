export interface IFileSizes {
  initial: number
  mods: {
    [fileName: string]: number
  }
}
