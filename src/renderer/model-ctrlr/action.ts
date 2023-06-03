import { useActions } from 'react-afc'

/** Инициализирует redux-action'ом */
export default function action<Action extends (...args: any[]) => any>(action: Action) {
  return (_, __) => {
    return () => {
      const result = useActions({ action })
      return result.action
    }
  }
}
