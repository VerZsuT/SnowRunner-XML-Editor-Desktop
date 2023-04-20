import bridge from '#r/scripts/bridge'
import { config } from '#r/services'

class Template {
  constructor() {
    this.changeTitle()
    this.handleKeys()
  }

  private changeTitle(): void {
    document.title = `SnowRunner XML Editor v${config.version}`
  }

  private handleKeys(): void {
    document.addEventListener('keydown', event => {
      const keyIs = (code: string) => event.code === `Key${code}`
      const shift = event.shiftKey
      const ctrl = event.ctrlKey
      const dev = config.buildType === 'dev'

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

  private onSave(): void {
    document.querySelector<HTMLInputElement>('#save')?.click()
  }

  private onQuit(): void {
    bridge.quitApp()
  }

  private onDevtools(): void {
    bridge.devTools()
  }
}

new Template()
