/** Список аддонов трака и подписи для выбора. */

import type { AddonFile, GameTexts } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'
import { translate } from './texts'

/** Загружает аддоны трака из основной игры, DLC и модов. */
export function loadAddons(truck: string): Promise<AddonFile[]> {
	return call(commands.listAddons(truck))
}

/**
 * Аддоны, которые можно показать в выборе: установленные, а если их нет —
 * весь список. Прежний интерфейс показывал только установленные аддоны.
 */
export function selectableAddons(addons: AddonFile[]): AddonFile[] {
	const installed = addons.filter(addon => addon.installed)

	return installed.length > 0 ? installed : addons
}

/** Подпись аддона: перевод UiName, сам ключ или имя файла. */
export function addonLabel(addon: AddonFile, texts: GameTexts | null): string {
	return translate(texts, addon.uiName, addon.modName) ?? addon.uiName ?? addon.name
}
