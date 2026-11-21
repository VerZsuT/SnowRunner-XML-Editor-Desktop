import { beforeEach, describe, expect, it } from 'vitest'
import { XMLElement } from './xml-element'
import { XMLTemplates, XMLTemplatesCache } from './xml-templates'

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

/** Сколько раз файл шаблона читался. */
let reads = 0

/**
 * Создать кэш шаблонов по содержимому файлов.
 * @param templates Содержимое файлов шаблонов по имени.
 * @returns Кэш.
 */
function makeCache(templates: Record<string, string>) {
	return new XMLTemplatesCache(async name => {
		reads++

		const xml: string | undefined = templates[name.replace(/\.xml$/, '')]

		return xml === undefined
			? undefined
			: await XMLElement.from(xml)
	})
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
	/** Кэш на тест. */
	let cache: XMLTemplatesCache

	beforeEach(() => {
		reads = 0
		cache = makeCache({ trucks: TRUCKS_XML, self: SELF_XML })
	})

	it('from(string) не уходит в бесконечную рекурсию', async () => {
		const templates = await XMLTemplates.from(SOURCE, { templates: cache })
		const element = await getTemplateElement(SOURCE)

		expect(templates).toBeInstanceOf(XMLTemplates)
		expect(templates!.getValue(element, 'SomeAttr')).toBe('value')
	})

	it('читает файл шаблона один раз для повторных Include', async () => {
		await XMLTemplates.from(SOURCE, { templates: cache })
		await XMLTemplates.from(SOURCE, { templates: cache })

		expect(reads).toBe(1)
	})

	it('clear сбрасывает кэш шаблонов', async () => {
		await XMLTemplates.from(SOURCE, { templates: cache })
		expect(reads).toBe(1)

		cache.clear()
		await XMLTemplates.from(SOURCE, { templates: cache })

		expect(reads).toBe(2)
	})

	it('самоссылающийся шаблон не зависает', async () => {
		const templates = await XMLTemplates.from(SOURCE_SELF, { templates: cache })
		const element = await getTemplateElement(SOURCE_SELF)

		expect(templates).toBeInstanceOf(XMLTemplates)
		expect(templates!.getValue(element, 'SomeAttr')).toBeUndefined()
	})
})