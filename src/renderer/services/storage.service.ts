/** Работа с `local storage` */
export default class Storage {
  static pop<T = string>(name: string): T {
    const value = this.get<T>(name)
    localStorage.removeItem(name)
    return value
  }

  static get<T = string>(name: string): T {
    const value = localStorage.getItem(name)
    switch (value) {
      case 'null':
        return <T>null
      case 'undefined':
        return <T>undefined
      default:
        return <T>value
    }
  }

  static set(name: string, value: string): void {
    localStorage.setItem(name, value)
  }
}
