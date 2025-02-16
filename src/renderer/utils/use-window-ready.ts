import { onMounted } from 'vue'
import type { ProgramWindow } from '/mods/renderer'
import { Windows } from '/mods/renderer'

/**
 * Послать сигнал "окно готово к показу" после отрисовки компонента.
 * @param window Окно.
 */
export default function useWindowReady(window: ProgramWindow) {
  onMounted(() => Windows.windowReady(window))
}
