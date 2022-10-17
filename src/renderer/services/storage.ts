/** Работа с `local storage` */
class StorageService {
  pop<T = string>(name: string): T {
    const value = this.get(name)
    localStorage.removeItem(name)
    return value as T
  }

  get<T = string>(name: string): T {
    const value = localStorage.getItem(name)
    switch (value) {
    case 'null':
      return null as T
    case 'undefined':
      return undefined as T
    default:
      return value as T
    }
  }

  set(name: string, value: string): void {
    localStorage.setItem(name, value)
  }
}

export const storage = new StorageService()
