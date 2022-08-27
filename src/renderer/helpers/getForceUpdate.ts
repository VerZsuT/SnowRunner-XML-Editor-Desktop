import {createState} from 'react-afc'

export function getForceUpdate() {
    const [state, setState] = createState({ bool: false })
    return () => setState({ bool: !state.bool })
}
