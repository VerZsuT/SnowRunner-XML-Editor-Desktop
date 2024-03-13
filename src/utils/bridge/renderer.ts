import { Bridge } from 'emr-bridge/renderer'

/**
 * Возвращает метод, принимающий аргументы и вызывающий `Bridge[key](...args)` с этими аргументами  
 * _renderer process_
 * @param key - название публичной функции
*/
export function providePubFunc<T extends (...args: any[]) => any>(key: string) {
  return (...args: Parameters<T>): ReturnType<T> => Bridge.as<any>()[key](...args)
}

/**
 * Возвращает метод, не принимающий аргументы и вызывающий `Bridge[key](...args)`
 * с переданными в `provideVoidPubFunc` аргументами  
 * _renderer process_
 * @param key - название публичной функции
 * @param args - аргументы, передаваемые при каждом вызове
 */
export function provideVoidPubFunc<T extends (...args: any[]) => any>(key: string, ...args: Parameters<T>) {
  return (): ReturnType<T> => Bridge.as<any>()[key](...args)
}
