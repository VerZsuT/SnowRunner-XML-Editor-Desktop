/** Работа с `local storage` */
class StorageService {
  pop<T = string>(name: string): T {
    const value = this.get<T>(name)
    localStorage.removeItem(name)
    return value
  }

  get<T = string>(name: string): T {
    const value = localStorage.getItem(name)
    switch (value) {
    case 'null':
      return <T> null
    case 'undefined':
      return <T> undefined
    default:
      return <T> value
    }
  }

  set(name: string, value: string): void {
    localStorage.setItem(name, value)
  }
}

export default new StorageService()
