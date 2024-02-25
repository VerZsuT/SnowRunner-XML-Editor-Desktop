export enum Keys {
  getEPF = 'dialogs.get-epf',
  saveEPF = 'dialogs.save-epf',
  getInitial = 'dialogs.get-initial',
  getDir = 'dialogs.get-dir',
  getDirs = 'dialogs.get-dirs',
  getPaks = 'dialogs.get-paks',
  getXML = 'dialogs.get-xml'
}

export interface IPublic {
  [Keys.getEPF](): string | undefined
  [Keys.saveEPF](defaultName: string): string | undefined
  [Keys.getInitial](): string | undefined
  [Keys.getDir](): string | undefined
  [Keys.getXML](): string | undefined
  [Keys.getDirs](): string[] | undefined
  [Keys.getPaks](): string[] | undefined
}
