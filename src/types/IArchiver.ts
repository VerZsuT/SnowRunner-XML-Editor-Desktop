interface IArchiver {
  update(source: string, direction: string): Promise<void>
  unpack(source: string, direction: string, isMod?: boolean): Promise<void>
  add(source: string, direction: string): Promise<void>
}

export default IArchiver
