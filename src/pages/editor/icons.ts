/** Иконки групп редактора. */
export type GroupIcon =
	| 'banana'
	| 'crane'
	| 'engines'
	| 'fuel'
	| 'gearboxes'
	| 'steering-wheel'
	| 'suspensions'
	| 'texts'
	| 'trailer'
	| 'truck'
	| 'unlock'
	| 'wheels'
	| 'winches'
	| 'wrench'

const FILES = import.meta.glob<string>(
	'../../images/icons/*.webp',
	{ eager: true, query: '?url', import: 'default' }
)

const LINKS = new Map<string, string>()

for (const [path, url] of Object.entries(FILES)) {
	const match = /icons[\\/]([^\\/]+)\.webp$/.exec(path)

	if (match) {
		LINKS.set(match[1], url)
	}
}

/** Ссылка на иконку группы; пустая строка, если файла нет. */
export function groupIcon(name: GroupIcon): string {
	return LINKS.get(name) ?? ''
}
