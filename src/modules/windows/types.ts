import type { BrowserWindow } from 'electron'
import type { Page, ProgramWindow, WindowType } from './enums'
import type ManagerType from './main'

export interface IGeneralWindow extends BrowserWindow {
  route(page: Page): void
}

/** Параметры создания окна программы */
export interface ICreateWindowAttrs {
  /** Путь к html файлу */
  path: string
  /** Путь в dev html файлу */
  devURL: string
  /** Изначальная ширина окна */
  width?: number
  /** Изначальная высота окна */
  height?: number
  /** Минимальная ширина окна */
  minWidth?: number
  /** Минимальная высота окна */
  minHeight?: number
  /** Максимальная ширина окна */
  maxWidth?: number
  /** Максимальная высота окна */
  maxHeight?: number
  /** Можно ли изменять размер окна */
  resizable?: boolean
  /** Показать окно сразу */
  show?: boolean
  /** Родительское окно (для модальных окон) */
  parent?: BrowserWindow
  /** Является ли окно модальным */
  modal?: boolean
  /** Имеет ли окно рамки */
  frame?: boolean
  /** Уникальное имя окна */
  name: ProgramWindow
}

/** Параметры создания объекта окна программы */
export type WindowParams<T extends BrowserWindow = BrowserWindow> = ICreateWindowAttrs & {
  /**
   * Подписаться на событие после создания окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
   */
  onCreated?(window: T, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие после фокуса окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
   */
  onFocused?(window: T, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие перед закрытием окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
  */
  onClose?(window: T, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие после показа окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
  */
  onShowed?(window: T, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Функция-создатель объекта окна
   * @param superCreate - функция-создатель из класса объекта
   * @param args - прочие переданные для конкретного окна аргументы
  */
  create?(superCreate: () => Promise<T>, ...args: any[]): Promise<T>
  /** Тип окна программы */
  windowType: WindowType
}
