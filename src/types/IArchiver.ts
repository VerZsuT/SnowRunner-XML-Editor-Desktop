interface IArchiver {
  update(source: string, direction: string): void
  unpack(source: string, direction: string, isMod?: boolean, sync?: boolean): Promise<void>
}

export default IArchiver
