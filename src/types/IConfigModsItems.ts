/** Моды в конфигурации */
export default interface IConfigModsItems {
  [fileName: string]: {
    name: string
    path: string
  }
}
