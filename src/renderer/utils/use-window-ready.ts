import { onMounted } from 'vue'

import type { ProgramWindow } from '/mods/renderer'
import { Windows } from '/mods/renderer'

/** Посылает сигнал "окно готово к показу" после отрисовки компонента */
export default function useWindowReady(window: ProgramWindow) {
  onMounted(() => Windows.windowReady(window))
}
