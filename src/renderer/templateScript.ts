import Bridge from '#r/scripts/bridge'
import { Config } from '#r/services'

class _Template {
  static changeTitle(): void {
    document.title = `SnowRunner XML Editor v${Config.version}`
  }

  static handleKeys(): void {
    document.addEventListener('keydown', event => {
      const keyIs = (code: string) => event.code === `Key${code}`
      const shift = event.shiftKey
      const ctrl = event.ctrlKey
      const dev = Config.buildType === 'dev'

      if (!ctrl) return

      if (keyIs('S')) {
        this.onSave()
      }
      else if (keyIs('Q')) {
        this.onQuit()
      }
      else if (keyIs('I') && shift && dev) {
        this.onDevtools()
      }
    })
  }

  static onSave(): void {
    document.querySelector<HTMLInputElement>('#save')?.click()
  }

  static onQuit(): void {
    Bridge.quitApp()
  }

  static onDevtools(): void {
    Bridge.devTools()
  }

  static {
    this.changeTitle()
    this.handleKeys()
  }
}
