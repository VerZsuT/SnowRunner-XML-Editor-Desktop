/**
 * Клиент документов игры: единственная точка общения интерфейса с Rust.
 *
 * Документ открывается один раз и живёт в памяти Rust. Все мутации проходят
 * через {@link DocumentSession}: она хранит текущую версию, выстраивает правки
 * в очередь и отдаёт новое значение после каждой из них.
 */

import { commands } from './bindings'
import type {
	AttrDescriptor,
	DocumentInfo,
	DocumentKind,
	Engine,
	Gearbox,
	MutationResult,
	SaveResult,
	SuspensionSet,
	Truck,
	TruckAddon,
	Wheel,
	Wheels,
	Winch
} from './bindings'
import { call } from './invoke'

/** Клиент команд документов. */
export interface DocumentClient {
	/** Открывает документ и возвращает его в реестре. */
	open(kind: DocumentKind, name: string, modName?: string | null): Promise<DocumentInfo>

	/** Сведения об открытом документе. */
	info(docId: string): Promise<DocumentInfo>

	/** Открытые документы. */
	list(): Promise<DocumentInfo[]>

	/** Документы с несохранёнными правками. */
	dirty(): Promise<DocumentInfo[]>

	/** Закрывает документ; изменённый закрывается только с `force`. */
	close(docId: string, force: boolean): Promise<boolean>

	/** Модель трака. */
	readTruck(docId: string): Promise<Truck>

	/** Модели двигателей. */
	readEngines(docId: string): Promise<Engine[]>

	/** Модели коробок передач. */
	readGearboxes(docId: string): Promise<Gearbox[]>

	/** Наборы подвесок. */
	readSuspensions(docId: string): Promise<SuspensionSet[]>

	/** Лебёдки. */
	readWinches(docId: string): Promise<Winch[]>

	/** Набор шин и дисков. */
	readWheels(docId: string): Promise<Wheels>

	/** Одиночное колесо. */
	readWheel(docId: string): Promise<Wheel>

	/** Аддон. */
	readAddon(docId: string): Promise<TruckAddon>

	/** Устанавливает атрибут; `null` удаляет его. */
	setAttr(docId: string, revision: number, descriptor: AttrDescriptor, value: string | null): Promise<MutationResult>

	/** Заменяет текст элемента. */
	setText(docId: string, revision: number, selector: string, text: string): Promise<MutationResult>

	/** Добавляет дочерний элемент. */
	addElement(docId: string, revision: number, parent: string, name: string, index: number | null): Promise<MutationResult>

	/** Удаляет элемент. */
	removeElement(docId: string, revision: number, selector: string): Promise<MutationResult>

	/** Переставляет элемент среди одноимённых соседей. */
	moveElement(docId: string, revision: number, selector: string, to: number): Promise<MutationResult>

	/** Сохраняет документ на диск. */
	save(docId: string): Promise<SaveResult>

	/** Сохраняет все изменённые документы. */
	saveAll(): Promise<SaveResult[]>

	/** Читает документ заново с диска. */
	reset(docId: string): Promise<DocumentInfo>
}

/** Клиент команд Tauri. */
export const documentClient: DocumentClient = {
	open: (kind, name, modName = null) => call(commands.openDocument(kind, name, modName ?? null)),
	info: docId => call(commands.documentInfo(docId)),
	list: () => commands.listDocuments(),
	dirty: () => commands.dirtyDocuments(),
	close: (docId, force) => call(commands.closeDocument(docId, force)),
	readTruck: docId => call(commands.documentTruck(docId)),
	readEngines: docId => call(commands.documentEngines(docId)),
	readGearboxes: docId => call(commands.documentGearboxes(docId)),
	readSuspensions: docId => call(commands.documentSuspensions(docId)),
	readWinches: docId => call(commands.documentWinches(docId)),
	readWheels: docId => call(commands.documentWheels(docId)),
	readWheel: docId => call(commands.documentWheel(docId)),
	readAddon: docId => call(commands.documentAddon(docId)),
	setAttr: (docId, revision, descriptor, value) => call(commands.setAttr(docId, revision, descriptor.selector, descriptor.name, value)),
	setText: (docId, revision, selector, text) => call(commands.setText(docId, revision, selector, text)),
	addElement: (docId, revision, parent, name, index) => call(commands.addElement(docId, revision, parent, name, index)),
	removeElement: (docId, revision, selector) => call(commands.removeElement(docId, revision, selector)),
	moveElement: (docId, revision, selector, to) => call(commands.moveElement(docId, revision, selector, to)),
	save: docId => call(commands.saveDocument(docId)),
	saveAll: () => call(commands.saveAllDocuments()),
	reset: docId => call(commands.resetDocument(docId))
}

/** Открытый документ с последовательными правками. */
export class DocumentSession {
	private infoValue: DocumentInfo
	private queue: Promise<unknown> = Promise.resolve()
	private readonly listeners = new Set<() => void>()

	constructor(info: DocumentInfo, private readonly client: DocumentClient = documentClient) {
		this.infoValue = info
	}

	/** Открывает документ и создаёт сессию. */
	static async open(
		kind: DocumentKind,
		name: string,
		client: DocumentClient = documentClient,
		modName: string | null = null
	) {
		return new DocumentSession(await client.open(kind, name, modName), client)
	}

	/** Сведения о документе. */
	get info(): DocumentInfo {
		return this.infoValue
	}

	/** Идентификатор документа. */
	get docId(): string {
		return this.infoValue.docId
	}

	/** Вид документа. */
	get kind(): DocumentKind {
		return this.infoValue.kind
	}

	/** Имя файла без расширения. */
	get name(): string {
		return this.infoValue.name
	}

	/** Путь файла на диске. */
	get path(): string {
		return this.infoValue.path
	}

	/** Имя записи архива. */
	get archiveName(): string {
		return this.infoValue.archiveName
	}

	/** Мод, из которого взят файл. */
	get modName(): string | null {
		return this.infoValue.modName ?? null
	}

	/** Текущая версия документа. */
	get revision(): number {
		return this.infoValue.revision
	}

	/** Есть несохранённые правки. */
	get dirty(): boolean {
		return this.infoValue.dirty
	}

	/** Модель трака. */
	readTruck() {
		return this.client.readTruck(this.docId)
	}

	/** Модели двигателей. */
	readEngines() {
		return this.client.readEngines(this.docId)
	}

	/** Модели коробок передач. */
	readGearboxes() {
		return this.client.readGearboxes(this.docId)
	}

	/** Наборы подвесок. */
	readSuspensions() {
		return this.client.readSuspensions(this.docId)
	}

	/** Лебёдки. */
	readWinches() {
		return this.client.readWinches(this.docId)
	}

	/** Набор шин и дисков. */
	readWheels() {
		return this.client.readWheels(this.docId)
	}

	/** Одиночное колесо. */
	readWheel() {
		return this.client.readWheel(this.docId)
	}

	/** Аддон. */
	readAddon() {
		return this.client.readAddon(this.docId)
	}

	/** Устанавливает атрибут; `null` удаляет его. */
	setAttr(descriptor: AttrDescriptor, value: string | null): Promise<MutationResult> {
		return this.mutate(revision => this.client.setAttr(this.docId, revision, descriptor, value))
	}

	/** Заменяет текст элемента. */
	setText(selector: string, text: string): Promise<MutationResult> {
		return this.mutate(revision => this.client.setText(this.docId, revision, selector, text))
	}

	/** Добавляет дочерний элемент. */
	addElement(parent: string, name: string, index: number | null = null): Promise<MutationResult> {
		return this.mutate(revision => this.client.addElement(this.docId, revision, parent, name, index))
	}

	/** Удаляет элемент. */
	removeElement(selector: string): Promise<MutationResult> {
		return this.mutate(revision => this.client.removeElement(this.docId, revision, selector))
	}

	/** Переставляет элемент среди одноимённых соседей. */
	moveElement(selector: string, to: number): Promise<MutationResult> {
		return this.mutate(revision => this.client.moveElement(this.docId, revision, selector, to))
	}

	/** Сохраняет документ на диск. */
	save(): Promise<SaveResult> {
		return this.enqueue(async () => {
			const result = await this.client.save(this.docId)

			this.update({ revision: result.revision, dirty: false })

			return result
		})
	}

	/** Читает документ заново с диска, отбрасывая правки в памяти. */
	reset(): Promise<DocumentInfo> {
		return this.enqueue(async () => {
			const info = await this.client.reset(this.docId)

			this.update(info)

			return info
		})
	}

	/** Закрывает документ в реестре Rust. */
	close(force = false): Promise<boolean> {
		return this.enqueue(async () => this.client.close(this.docId, force))
	}

	/**
	 * Подписка на изменения документа.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	readonly subscribe = (listener: () => void): (() => void) => {
		this.listeners.add(listener)

		return () => this.listeners.delete(listener)
	}

	/** Обновляет версию и флаг изменений. */
	private update(info: Pick<DocumentInfo, 'revision' | 'dirty'>): void {
		this.infoValue = { ...this.infoValue, revision: info.revision, dirty: info.dirty }

		for (const listener of this.listeners) {
			listener()
		}
	}

	/** Выполняет мутацию с актуальной версией и обновляет состояние. */
	private mutate(operation: (revision: number) => Promise<MutationResult>): Promise<MutationResult> {
		return this.enqueue(async () => {
			const result = await operation(this.infoValue.revision)

			this.update({ revision: result.revision, dirty: result.dirty })

			return result
		})
	}

	/**
	 * Ставит операцию в очередь: правки уходят в Rust строго по порядку,
	 * поэтому версия документа всегда актуальна.
	 */
	private enqueue<T>(operation: () => Promise<T>): Promise<T> {
		const next = this.queue.then(operation, operation)

		this.queue = next.then(ignore, ignore)

		return next
	}
}

/** Ничего не делает: нужен для продолжения очереди после ошибки. */
function ignore(): void {}
