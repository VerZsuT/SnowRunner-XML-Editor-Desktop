import type { ModCandidate, ModEntry } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'

/** Установленные моды. */
export async function listMods(): Promise<ModEntry[]> {
	return commands.listMods()
}

/** Моды, найденные по стандартному пути SnowRunner. */
export async function findMods(): Promise<ModCandidate[]> {
	return commands.findMods()
}

/** Добавляет `.pak` моду: распаковывает файлы игры и сохраняет запись. */
export async function addMod(path: string): Promise<ModEntry[]> {
	return call(commands.addMod(path))
}

/** Убирает мод из списка. */
export async function removeMod(name: string): Promise<ModEntry[]> {
	return call(commands.removeMod(name))
}

/** Пересобирает распакованные файлы модов. */
export async function syncMods(): Promise<ModEntry[]> {
	return call(commands.syncMods())
}
