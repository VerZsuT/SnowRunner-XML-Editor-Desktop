import type { MessageType } from 'ant-design-vue/es/message'
import type { MainMessageType } from './enums'

/** Сообщение из main-process. */
export interface IMainMessage {
	/** Тип. */
	type: MainMessageType

	/** Содержимое. */
	text: string
}


/** Работа с сообщениями программы. [main] */
export interface IMainMessages {
	/**
	 * Вывести ошибку.
	 * @param text Текст ошибки.
	 */
	error(text: string): void

	/**
	 * Вывести информацию.
	 * @param text Текст информации.
	 */
	info(text: string): void

	/**
	 * Вывести сообщение о успехе.
	 * @param text Текст сообщения.
	 */
	success(text: string): void

	/**
	 * Вывести предупреждение.
	 * @param text Текст предупреждения.
	 */
	warn(text: string): void

	/**
	 * Показать загрузку.
	 * @param text Текст уведомления.
	 * @returns Функция завершения.
	 */
	loading(text: string): () => void
}

/** Работа с сообщениями программы. [renderer] */
export interface IRendererMessages {
	/** Обработать сообщения из main процесса. */
	handleMessages(): void

	/**
	 * Вывести сообщение об ошибке.
	 * @param error Объект ошибки.
	 */
	error(error: Error): void
	/**
	 * Вывести сообщение об ошибке.
	 * @param error Текст ошибки.
	 */
	error(error: string): void
	error(error: string | Error): void

	/**
	 * Вывести информационное сообщение.
	 * @param text Текст сообщения.
	 */
	info(text: string): void

	/**
	 * Вывести уведомление об успехе.
	 * @param text Текст уведомления.
	 */
	success(text: string): void

	/**
	 * Показать уведомление загрузки.
	 * @param text Текст уведомления.
	 */
	loading(text: string): MessageType

	/**
	 * Вывести предупреждение.
	 * @param text Текст предупреждения.
	 */
	warning(text: string): void
}


