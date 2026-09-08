import { message, notification } from 'ant-design-vue'
import { Bridge } from 'emr-bridge/renderer'
import { MainMessageType } from './enums'
import { PubKeys } from './public'
import type { IRendererMessages } from './types'

/** Работа с сообщениями программы. [renderer] */
export class Messages implements IRendererMessages {
	/** Остановить загрузку. */
	private stopLoading?: ReturnType<typeof message.loading>

	handleMessages() {
		Bridge.as<object>().on(PubKeys.messageEvent, ({ type, text }: {type: MainMessageType, text: string}) => {
			switch (type) {
				case MainMessageType.error:
					this.error(text)

					break
				case MainMessageType.info:
					this.info(text)

					break
				case MainMessageType.success:
					this.success(text)

					break
				case MainMessageType.warning:
					this.warning(text)

					break
				case MainMessageType.startLoading:
					this.stopLoading = this.loading(text)

					break
				case MainMessageType.stopLoading:
					this.stopLoading?.()

					break
			}
		})
	}

	error(error: Error): void
	error(error: string): void
	error(error: string | Error): void {
		notification.error({ message: 'Error', description: String(error), duration: 10_000 })
		console.error(error)
	}

	info(text: string) {
		void message.info(text)
	}

	success(text: string) {
		void message.success(text)
	}

	loading(text: string) {
		return message.loading(text)
	}

	warning(text: string) {
		notification.warning({ message: 'Error', description: text, duration: 10_000 })
	}
}
