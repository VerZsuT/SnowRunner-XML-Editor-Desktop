export enum PubKeys {
  getEPF = 'dialogs/get-epf',
  saveEPF = 'dialogs/save-epf',
  getInitial = 'dialogs/get-initial',
  getDir = 'dialogs/get-dir',
  getDirs = 'dialogs/get-dirs',
  getPaks = 'dialogs/get-paks',
  getXML = 'dialogs/get-xml'
}

export type PubType = {
  [PubKeys.getEPF](): string | undefined
  [PubKeys.saveEPF](defaultName: string): string | undefined
  [PubKeys.getInitial](): string | undefined
  [PubKeys.getDir](): string | undefined
  [PubKeys.getXML](): string | undefined
  [PubKeys.getDirs](): string[] | undefined
  [PubKeys.getPaks](): string[] | undefined
}
