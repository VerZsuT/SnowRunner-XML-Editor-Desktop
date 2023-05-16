import { PreloadType } from '#g/enums'

class PreloadService {
  register<T>(value: T, type = PreloadType.common): void {
    if (!window.preloads) {
      window.preloads = {}
    }
    if (window.preloads[type]) {
      console.warn(`Overwriting preload (type='${type}')`)
    }
    window.preloads[type] = value
  }

  get<T>(type = PreloadType.common): T | never {
    if (!window.preloads) {
      throw new Error('Preloads not defined')
    }

    const preload = window.preloads[type]

    if (!preload) {
      throw new Error(`Preload not found (type='${type}')`)
    }

    return preload
  }
}

const preload = new PreloadService()

export default preload