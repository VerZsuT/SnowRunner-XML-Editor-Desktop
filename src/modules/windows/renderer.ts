import { initMain, mainMethod } from '@bridge/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Page, ProgramWindow } from './enums'
import type { Windows as WindowsMain } from './main'
import { PubKeys } from './public'
import type { IRendererWindows } from './types'

/** Работа с окнами программы. [renderer] */
@initMain()
export class Windows implements IRendererWindows {
	/** Мост main-renderer. */
	private readonly bridge = Bridge.as<object>()

	@mainMethod()
	openWindow!: WindowsMain['openWindow']

	onRoute(handler: (page: Page) => void) {
		return this.bridge.on(PubKeys.routeEvent, handler)
	}

	windowReady(window: ProgramWindow) {
		this.bridge.emit(PubKeys.windowReadyEvent, window)
	}
}
