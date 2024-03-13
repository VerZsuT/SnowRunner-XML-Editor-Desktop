import { Config, Helpers, Messages } from '/mods/renderer'

/** Скрипт шаблона */
class Template {
  /** Инициализация */
  init() {
    this.changeTitle()
    this.handleKeys()
    Messages.handleMessages()
  }

  /** Изменить заголовок */
  changeTitle() {
    document.title = `SnowRunner XML editor v${Config.version}`
  }

  /** Отследить нажатие горячих клавиш */
  handleKeys() {
    document.addEventListener('keydown', event => {
      const keyIs = (code: string) => event.code === `Key${code}`
      const shift = event.shiftKey
      const ctrl = event.ctrlKey

      if (!ctrl) return

      // Быстрое сохранение
      if (keyIs('S')) {
        document.querySelector<HTMLInputElement>('#save')?.click()
      }
      // Быстрое закрытие
      else if (keyIs('Q')) {
        Helpers.quitApp()
      }
      // Открыть `devtools`
      else if (keyIs('I') && shift && ctrl) {
        Helpers.devTools()
      }
    })
  }
}

new Template().init()
