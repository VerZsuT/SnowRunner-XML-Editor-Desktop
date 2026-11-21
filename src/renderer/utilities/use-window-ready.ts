import type { ProgramWindow } from '@modules/windows/enums'
import { di } from '@utilities/di/container'
import { WINDOWS_TOKEN } from '@utilities/di/renderer/tokens'
import { useEffect } from 'react'

/**
 * Послать сигнал "окно готово к показу" после отрисовки компонента.
 * @param window Окно.
 */
export function useWindowReady(window: ProgramWindow) {
	useEffect(() => {
		di.resolve(WINDOWS_TOKEN).windowReady(window)
	}, [window])
}
