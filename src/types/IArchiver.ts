interface IArchiver {
  update(source: string, direction: string): Promise<void>
  unpack(source: string, direction: string, isMod?: boolean): Promise<void>
}

export default IArchiver
