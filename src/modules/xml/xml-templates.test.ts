import { di } from '@utilities/di/container'
import { DIRS_TOKEN, FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { beforeEach, describe, expect, it } from 'vitest'
import { XMLElement } from './xml-element'
import { XMLTemplates } from './xml-templates'

/** Основной XML с блоком `_templates`. */
const SOURCE = `<Truck>
	<_templates Include="trucks">
		<_templates _template="TruckData" />
	</_templates>
</Truck>`

/** Шаблон, подключаемый через `Include="trucks"`. */
const TRUCKS_XML = `<templates>
	<_templates>
		<TruckData SomeAttr="value" />
	</_templates>
</templates>`

/** Самоссылающийся шаблон: `A` включает `A`. */
const SELF_XML = `<templates>
	<_templates Include="self" />
</templates>`

/** XML, подключающий самоссылающийся шаблон. */
const SOURCE_SELF = `<Truck>
	<_templates Include="self">
		<_templates _template="TruckData" />
	</_templates>
</Truck>`

/** Сколько раз файл шаблона читался с диска. */
let reads = 0

/**
 * Зарегистрировать поддельные зависимости.
 * @param templates Содержимое файлов шаблонов по имени.
 */
function registerDeps(templates: Record<string, string>) {
	di.register(FILES_TOKEN, { isFile: () => false } as any)
	di.register(DIRS_TOKEN, {
		templates: {
			file: (fileName: string) => ({
				readFromXML: async () => {
					reads++

					const xml: string | undefined = templates[fileName.replace(/\.xml$/, '')]

					return xml === undefined
						? undefined
						: await XMLElement.from(xml)
				}
			})
		}
	} as any)
}

/**
 * Получить элемент `_templates` со ссылкой на шаблон.
 * @param source Содержимое XML.
 */
async function getTemplateElement(source: string) {
	const root = await XMLElement.from(source)

	return root!.select('_templates[_template]')!
}

describe('XMLTemplates', () => {
	beforeEach(() => {
		reads = 0
		XMLTemplates.clearCache()
		registerDeps({ trucks: TRUCKS_XML, self: SELF_XML })
	})

	it('from(string) не уходит в бесконечную рекурсию', async () => {
		const templates = await XMLTemplates.from(SOURCE)
		const element = await getTemplateElement(SOURCE)

		expect(templates).toBeInstanceOf(XMLTemplates)
		expect(templates!.getValue(element, 'SomeAttr')).toBe('value')
	})

	it('читает файл шаблона один раз для повторных Include', async () => {
		await XMLTemplates.from(SOURCE)
		await XMLTemplates.from(SOURCE)

		expect(reads).toBe(1)
	})

	it('clearCache сбрасывает кэш шаблонов', async () => {
		await XMLTemplates.from(SOURCE)
		expect(reads).toBe(1)

		XMLTemplates.clearCache()
		await XMLTemplates.from(SOURCE)

		expect(reads).toBe(2)
	})

	it('самоссылающийся шаблон не зависает', async () => {
		const templates = await XMLTemplates.from(SOURCE_SELF)
		const element = await getTemplateElement(SOURCE_SELF)

		expect(templates).toBeInstanceOf(XMLTemplates)
		expect(templates!.getValue(element, 'SomeAttr')).toBeUndefined()
	})
})
