import type { BrowserWindow } from 'electron'
import type { Page, ProgramWindow, WindowType } from './enums'
import type ManagerType from './main'

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
export type WindowParams<T extends BrowserWindow = BrowserWindow> = ICreateWindowAttrs & {
  /**
   * Подписаться на событие после создания окна.
   * @param window Окно программы.
   * @param Manager Менеджер окон.
   * @param args Прочие аргументы.
   */
  onCreated?(window: T, Manager: typeof ManagerType): void | Promise<void>

  /**
   * Подписаться на событие после фокуса окна.
   * @param window Окно программы.
   * @param Manager Менеджер окон.
   * @param args Прочие аргументы.
   */
  onFocused?(window: T, Manager: typeof ManagerType): void | Promise<void>

  /**
   * Подписаться на событие перед закрытием окна.
   * @param window Окно программы.
   * @param Manager Менеджер окон.
   * @param args Прочие аргументы.
  */
  onClose?(window: T, Manager: typeof ManagerType): void | Promise<void>

  /**
   * Подписаться на событие после показа окна.
   * @param window Окно программы.
   * @param Manager Менеджер окон.
   * @param args Прочие аргументы.
  */
  onShowed?(window: T, Manager: typeof ManagerType): void | Promise<void>

  /**
   * Функция-создатель объекта окна.
   * @param superCreate Функция-создатель из класса объекта.
   * @param args -Прочие аргументы.
  */
  create?(superCreate: () => Promise<T>, ...args: any[]): Promise<T>

  /** Тип окна программы. */
  windowType: WindowType
}
