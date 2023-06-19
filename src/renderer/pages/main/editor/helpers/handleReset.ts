import { useContext, useOnDestroy } from 'react-afc'

import { ResetContext } from './getResetProvider'

/** Добавляет возможность сброса параметра */
export default function handleReset(onReset: () => void) {
  const { register, unregister } = useContext(ResetContext).val
  register(onReset)
  useOnDestroy(() => unregister(onReset))
}
