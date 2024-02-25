import { Config, Helpers, Messages } from '/mods/renderer'

class Template {
  _init() {
    this.changeTitle()
    this.handleKeys()
    Messages.handleMessages()
  }

  changeTitle() {
    document.title = `SnowRunner XML editor v${Config.version}`
  }

  handleKeys() {
    document.addEventListener('keydown', event => {
      const keyIs = (code: string) => event.code === `Key${code}`
      const shift = event.shiftKey
      const ctrl = event.ctrlKey

      if (!ctrl) return

      if (keyIs('S')) {
        document.querySelector<HTMLInputElement>('#save')?.click()
      }
      else if (keyIs('Q')) {
        Helpers.quitApp()
      }
      else if (keyIs('I') && shift && ctrl) {
        Helpers.devTools()
      }
    })
  }
}

new Template()._init()
