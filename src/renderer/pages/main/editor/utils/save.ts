import { onMounted, onUnmounted } from 'vue'

export type SaveEventListener = () => void | Promise<void>

class SaveUtils {
  private readonly listeners = new Set<SaveEventListener>()

  useOnSave(listener: SaveEventListener) {
    onMounted(() => this.listeners.add(listener))
    onUnmounted(() => this.listeners.delete(listener))
  }

  emitSave() {
    return Promise.all([...this.listeners].map(async listener => await listener()))
  }
}

export default new SaveUtils()
