import type { BrowserWindow } from 'electron'
import type { Page, ProgramWindow, WindowType } from './enums'

/** Главное окно. */
export interface IGeneralWindow extends BrowserWindow {
	/**
	 * Роутинг.
	 * @param page Страница.
	 */
	route(page: Page): void
}

/** Параметры создания окна программы. */
export interface ICreateWindowAttrs {
	/** Путь к html файлу. */
	path: string

	/** Путь в dev html файлу. */
	devURL: string

	/** Изначальная ширина окна. */
	width?: number

	/** Изначальная высота окна. */
	height?: number

	/** Минимальная ширина окна. */
	minWidth?: number

	/** Минимальная высота окна. */
	minHeight?: number

	/** Максимальная ширина окна. */
	maxWidth?: number

	/** Максимальная высота окна. */
	maxHeight?: number

	/** Можно ли изменять размер окна. */
	resizable?: boolean

	/** Показать окно сразу. */
	show?: boolean

	/** Родительское окно (для модальных окон). */
	parent?: BrowserWindow

	/** Является ли окно модальным. */
	modal?: boolean

	/** Имеет ли окно рамки. */
	frame?: boolean

	/** Уникальное имя окна. */
	name: ProgramWindow
}

/** Параметры создания объекта окна программы. */
export interface IWindowParams<T extends BrowserWindow = BrowserWindow> extends ICreateWindowAttrs {
	/**
	 * Подписаться на событие после создания окна.
	 * @param window Окно программы.
	 * @param Manager Менеджер окон.
	 * @param args Прочие аргументы.
	 */
	onCreated?(window: T, Manager: IMainWindows): void | Promise<void>

	/**
	 * Подписаться на событие после фокуса окна.
	 * @param window Окно программы.
	 * @param Manager Менеджер окон.
	 * @param args Прочие аргументы.
	 */
	onFocused?(window: T, Manager: IMainWindows): void | Promise<void>

	/**
	 * Подписаться на событие перед закрытием окна.
	 * @param window Окно программы.
	 * @param Manager Менеджер окон.
	 * @param args Прочие аргументы.
	*/
	onClose?(window: T, Manager: IMainWindows): void | Promise<void>

	/**
	 * Подписаться на событие после показа окна.
	 * @param window Окно программы.
	 * @param Manager Менеджер окон.
	 * @param args Прочие аргументы.
	*/
	onShowed?(window: T, Manager: IMainWindows): void | Promise<void>

	/**
	 * Функция-создатель объекта окна.
	 * @param superCreate Функция-создатель из класса объекта.
	 * @param args -Прочие аргументы.
	*/
	create?(superCreate: () => Promise<T>, ...args: any[]): Promise<T>

	/** Тип окна программы. */
	windowType: WindowType
}

/** Функция-создатель окна. */
type WindowCreator<T extends BrowserWindow = BrowserWindow> = (...args: any[]) => Promise<T>

/** Работа с окнами программы. [main] */
export interface IPublicWindows {
	/**
	 * Открыть окно программы.
	 * @param windowName Название окна.
	 * @param args Аргументы открытия.
	 */
	openWindow(windowName: ProgramWindow, ...args: any[]): Promise<void>
}

/** Работа с окнами программы. [renderer] */
export interface IRendererWindows extends IPublicWindows {
	/**
	 * Обработать событие роутинга.
	 * @param handler Обработчик.
	 * @returns Функция отписки.
	 */
	onRoute(handler: (page: Page) => void): () => void

	/**
	 * Вызвать событие готовности контента окна.
	 * @param window Окно.
	 */
	windowReady(window: ProgramWindow): void
}

/** Работа с окнами программы. [main] */
export interface IMainWindows extends IPublicWindows {
	/** Главное окно. */
	generalWindow: IGeneralWindow | undefined

	/**
	 * Создать новое модально окно.
	 * @param params Параметры окна.
	 * @returns Созданное окно.
	 */
	createModalWindow(params: IWindowParams): Promise<BrowserWindow>

	/**
	 * Создать новое окно.
	 * @param params Параметры окна.
	 * @returns Созданное окно.
	 */
	createWindow(params: IWindowParams): Promise<BrowserWindow>

	/**
	 * Зарегистрировать окно программы.
	 * @param window Параметры окна.
	 * @param creator Функция-создатель.
	 */
	regWindow<T extends BrowserWindow = BrowserWindow>(window: IWindowParams<T>, creator: WindowCreator<T>): void
}
