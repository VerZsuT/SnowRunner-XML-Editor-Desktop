import type { BrowserWindow } from 'electron'

import type { ProgramWindow, WindowType } from './enums'
import type ManagerType from './main'

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
export type WindowParams = ICreateWindowAttrs & {
  /**
   * Подписаться на событие создания окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
   */
  onCreate?(window: BrowserWindow, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие фокусе окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
   */
  onFocus?(window: BrowserWindow, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие закрытия окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
  */
  onClose?(window: BrowserWindow, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Подписаться на событие показа окна
   * @param window - созданное окно программы
   * @param Manager - класс менеджера окон
   * @param args - прочие переданные для конкретного окна аргументы
  */
  onShow?(window: BrowserWindow, Manager: typeof ManagerType): void | Promise<void>
  /**
   * Функция-создатель объекта окна
   * @param superCreate - функция-создатель из класса объекта
   * @param args - прочие переданные для конкретного окна аргументы
  */
  create?(superCreate: () => Promise<BrowserWindow>, ...args: any[]): Promise<BrowserWindow>
  /** Тип окна программы */
  windowType: WindowType
}
