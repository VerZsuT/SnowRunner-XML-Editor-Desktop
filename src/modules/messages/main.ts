import { emitEvent } from 'emr-bridge/main'
import { MainMessageType } from './enums'
import { PubKeys } from './public'
import type { IMainMessage, IMainMessages } from './types'

/** Работа с сообщениями программы. [main] */
export class Messages implements IMainMessages {
	error(text: string) {
		this.emitMessageEvent({ type: MainMessageType.error, text })
	}

	info(text: string) {
		this.emitMessageEvent({ type: MainMessageType.info, text })
	}

	success(text: string) {
		this.emitMessageEvent({ type: MainMessageType.success, text })
	}

	warn(text: string) {
		this.emitMessageEvent({ type: MainMessageType.warning, text })
	}

	loading(text: string) {
		this.emitMessageEvent({ type: MainMessageType.startLoading, text })

		return () => this.emitMessageEvent({ type: MainMessageType.stopLoading, text })
	}

	/**
	 * Вызвать событие сообщения.
	 * @param message Сообщение.
	 */
	private emitMessageEvent(message: IMainMessage) {
		emitEvent(PubKeys.messageEvent, message)
	}
}
