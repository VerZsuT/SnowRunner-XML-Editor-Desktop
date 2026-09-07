import type { ProgramWindow } from '@modules/windows/enums'
import { di } from '@utilities/di/container'
import { WINDOWS_TOKEN } from '@utilities/di/renderer/tokens'
import { onMounted } from 'vue'

/**
 * Послать сигнал "окно готово к показу" после отрисовки компонента.
 * @param window Окно.
 */
export function useWindowReady(window: ProgramWindow) {
  onMounted(() => di.resolve(WINDOWS_TOKEN).windowReady(window))
}
