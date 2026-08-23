import type { ProgramWindow } from '@modules/renderer'
import { Windows } from '@modules/renderer'
import { onMounted } from 'vue'

/**
 * Послать сигнал "окно готово к показу" после отрисовки компонента.
 * @param window Окно.
 */
export default function useWindowReady(window: ProgramWindow) {
  onMounted(() => Windows.windowReady(window))
}
