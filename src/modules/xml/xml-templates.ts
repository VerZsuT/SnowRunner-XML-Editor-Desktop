import type { Cheerio } from 'cheerio'
import { XMLElement } from './xml-element'

/** Кэш шаблонов `_templates`, создаётся на сессию редактора. */
export class XMLTemplatesCache {
	/** Кэш: `null` — файл отсутствует или не разобран. */
	private readonly values = new Map<string, XMLTemplates | null>()

	/** Загружаемые сейчас шаблоны (защита от циклических Include). */
	private readonly loading = new Set<string>()

	/**
	 * Создать кэш.
	 * @param read Функция чтения файла шаблона по имени.
	 */
	constructor(private readonly read: (name: string) => Promise<XMLElement | undefined>) {}

	/** Очистить кэш. */
	clear(): void {
		this.values.clear()
		this.loading.clear()
	}

	/**
	 * Загрузить шаблон по имени.
	 * @param name Имя шаблона без расширения `.xml`.
	 * @returns Шаблон или `undefined`, если файл отсутствует, не разобран или обнаружен цикл.
	 */
	async load(name: string): Promise<XMLTemplates | undefined> {
		if (this.values.has(name)) {
			return this.values.get(name) ?? undefined
		}

		if (this.loading.has(name)) {
			return
		}

		this.loading.add(name)

		try {
			const element = await this.read(name)

			if (!element) {
				this.values.set(name, null)

				return
			}

			// Файл шаблона может включать другой шаблон (цикл отсекается через `loading`).
			const nestedName = element.select(XMLTemplates.tagName)?.getAttr(XMLTemplates.includeAttr)?.str
			const templates = new XMLTemplates(
				element.toCheerio(),
				nestedName
					? await this.load(nestedName)
					: undefined
			)

			this.values.set(name, templates)

			return templates
		} catch {
			this.values.set(name, null)
		} finally {
			this.loading.delete(name)
		}
	}
}

/** Поставщик кэша шаблонов (читается только при наличии Include). */
export interface ITemplatesProvider {
	/** Кэш шаблонов. */
	readonly templates?: XMLTemplatesCache
}

/** Шаблоны `_templates`. */
export class XMLTemplates extends XMLElement {
	/** Название тега шаблонов. */
	static readonly tagName = '_templates'

	/** Название атрибута с включающим шаблоном. */
	static readonly includeAttr = 'Include'

	/** Название атрибута с именем шаблона. */
	private static readonly attrName = '_template'

	/** Включающий шаблон. */
	private readonly include: XMLTemplates | undefined

	/**
	 * Создать из строки или элемента.
	 * @param source XML строка или элемент.
	 * @param provider Поставщик кэша шаблонов.
	 * @returns Шаблоны или `undefined`.
	 */
	static async from(source: string | XMLElement, provider?: ITemplatesProvider): Promise<XMLTemplates | undefined> {
		const xml = XMLElement.isXMLElement(source)
			? source
			: await XMLElement.from(source)

		if (!xml) {
			return
		}

		const templates = xml.clone().select(XMLTemplates.tagName)

		if (!templates) {
			return
		}

		const includeName = templates.getAttr(XMLTemplates.includeAttr)?.str
		let include: XMLTemplates | undefined

		if (includeName) {
			const cache = provider?.templates

			include = cache
				? await cache.load(includeName)
				: undefined
		}

		return new XMLTemplates(templates.toCheerio(), include)
	}

	constructor(element: Cheerio<any>, include?: XMLTemplates) {
		super(element)
		this.include = include
	}

	/** Получить значение из шаблона. */
	getValue(element: XMLElement, attrName: string): string | undefined {
		const template = this.getTemplate(element)

		return template
			? this.getFromTemplate(element, template, attrName)
			: undefined
	}

	/** Получить значение из шаблона */
	private getFromTemplate(element: XMLElement, template: XMLElement, attrName: string): string | undefined {
		if (template.parent.tagName === element.tagName) {
			const value = template.getAttr(attrName)?.str

			if (value !== undefined) {
				return value
			}

			const extraTemplate = this.getExtraTemplate(template)

			return extraTemplate
				? this.getFromTemplate(element, extraTemplate, attrName)
				: undefined
		}

		const templateElement = template.select(`${element.tagName}`)

		if (templateElement) {
			const value = templateElement.getAttr(attrName)?.str

			if (value) {
				return value
			}
		}

		const extraTemplate = this.getExtraTemplate(template)

		return extraTemplate
			? this.getFromTemplate(element, extraTemplate, attrName)
			: undefined
	}

	/** Найти дополнительный шаблон. */
	private getExtraTemplate(template: XMLElement): XMLElement | undefined {
		return template.getAttr(XMLTemplates.attrName)
			? this.getTemplate(template)
			: undefined
	}

	/** Найти шаблон. */
	private getTemplate(element: XMLElement): XMLElement | undefined {
		let selector: string | undefined

		for (let target = element; target.exists(); target = target.parent) {
			const templateName = target.getAttr(XMLTemplates.attrName)?.str

			if (templateName) {
				selector = target === element
					? `${target.tagName} ${templateName}`
					: `${target.tagName} ${templateName} ${element.tagName}`

				break
			}
		}

		return selector
			? this.select(selector) ?? this.include?.getTemplate(element)
			: undefined
	}
}
