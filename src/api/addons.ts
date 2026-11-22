/** Список аддонов трака и подписи для выбора. */

import type { AddonFile, GameTexts } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'
import { translate } from './texts'

/** Загружает аддоны трака из основной игры, DLC и модов. */
export function loadAddons(truck: string, modName: string | null = null): Promise<AddonFile[]> {
	return call(commands.listAddons(truck, modName))
}


/** Подпись аддона: перевод UiName, сам ключ или имя файла. */
export function addonLabel(addon: AddonFile, texts: GameTexts | null): string {
	return translate(texts, addon.uiName, addon.modName) ?? addon.uiName ?? addon.name
}
