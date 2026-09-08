/** Публичные ключи. */
export enum PubKeys {
	getAllMods = 'mods/get-all-mods',
	findMods = 'mods/find-mods'
}

/** Типы публичных элементов. */
export type PubType = {
	[PubKeys.getAllMods](): Promise<[path: string, name: string][]>
	[PubKeys.findMods](dirPath: string): Promise<[path: string, name: string][]>
}
