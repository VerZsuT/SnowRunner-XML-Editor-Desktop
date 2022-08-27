import {afterUnmount, handleContext} from 'react-afc'

import {ResetContext} from './getResetProvider'

/** Добавляет возможность сброса параметра */
export function handleReset(onReset: () => void) {
    const { register, unregister } = handleContext(ResetContext)()
    register(onReset)
    afterUnmount(() => unregister(onReset))
}
