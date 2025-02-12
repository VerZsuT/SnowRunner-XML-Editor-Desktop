import { Config, Helpers, Messages } from '/mods/renderer'

/** Скрипт шаблона. */
class Template {
  /** Инициализация. */
  constructor() {
    this.changeTitle()
    this.handleKeys()
    Messages.handleMessages()
  }

  /** Изменить заголовок. */
  changeTitle() {
    document.title = `SnowRunner XML editor v${Config.version}`
  }

  /** Отследить нажатие горячих клавиш. */
  handleKeys() {
    document.addEventListener('keydown', event => {
      const keyIs = (code: string) => event.code === `Key${code}`
      const shift = event.shiftKey
      const ctrl = event.ctrlKey

      if (!ctrl) {
        return
      }

      if (keyIs('S')) {
        // Быстрое сохранение
        document.querySelector<HTMLInputElement>('#save')?.click()
      } else if (keyIs('Q')) {
        // Быстрое закрытие
        Helpers.quitApp()
      } else if (keyIs('I') && shift && ctrl) {
        // Открыть `devtools`
        Helpers.devtools()
      }
    })
  }
}

new Template()
