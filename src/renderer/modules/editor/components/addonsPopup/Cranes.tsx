import { PureComponent } from 'react'
import { t } from 'scripts'

enum Crane {
    RU = 'MinicraneRU',
    US = 'MinicraneUS'
}

interface IProps {
    fileDOM: Document
    show?: boolean
}

interface IState {
    hasRUCrane: boolean
    hasUSCrane: boolean
}

export class Cranes extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            hasRUCrane: Boolean(props.fileDOM.querySelector('Socket[Names*="MinicraneRU"]')),
            hasUSCrane: Boolean(props.fileDOM.querySelector('Socket[Names*="MinicraneUS"]'))
        }
    }

    render() {
        if (!this.props.show) return null
        const hasRUCrane = this.state.hasRUCrane
        const hasUSCrane = this.state.hasUSCrane

        return <>
            {hasRUCrane || hasRUCrane ? <>
                <b className='cranes-warn'>{t.CRANES_WARN_TITLE}</b>
                <p className='cranes-warn-message'>{t.CRANES_WARN_MESSAGE}</p>

                <label>US {t.CRANE}</label><br />
                {!hasUSCrane
                    ? <button
                        className='btn btn-primary add-crane'
                        disabled={!(hasRUCrane && !hasUSCrane)}
                        onClick={() => this.addCrane(Crane.US, Crane.RU)}
                    >
                        {t.ADD}
                    </button>
                    : <button
                        className='btn btn-danger remove-crane'
                        disabled={!(hasRUCrane && hasUSCrane)}
                        onClick={() => this.removeCrane(Crane.US)}
                    >
                        {t.REMOVE}
                    </button>
                }
                <br /><br />

                <label>RU {t.CRANE}</label><br />
                {!hasRUCrane
                    ? <button
                        className='btn btn-primary add-crane'
                        disabled={!(hasUSCrane && !hasRUCrane)}
                        onClick={() => this.addCrane(Crane.RU, Crane.US)}
                    >
                        {t.ADD}
                    </button>
                    : <button
                        className='btn btn-danger remove-crane'
                        disabled={!(hasRUCrane && hasUSCrane)}
                        onClick={() => this.removeCrane(Crane.RU)}
                    >
                        {t.REMOVE}
                    </button>
                }
            </> : <p>{t.CRANES_NOT_SUPPORT}</p>
            }
        </>
    }

    private addCrane = (crane: Crane, to: Crane) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names*="${to}"]`)
        const mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames.push(crane)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock*="${to}"]`).forEach(socket => {
            const namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock.push(crane)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types*="${to}"]`).forEach(shift => {
            const newShift = shift.cloneNode(true) as Element
            let types = newShift.getAttribute('Types').split(',').map(value => value.trim())
            types = types.filter(value => value !== to)
            types.push(crane)
            newShift.setAttribute('Types', types.join(', '))
            shift.after(newShift)
        })
        if (crane === Crane.RU) {
            this.setState({
                hasRUCrane: true
            })
        } else {
            this.setState({
                hasUSCrane: true
            })
        }
    }

    private removeCrane = (crane: Crane) => {
        const mainSocket = this.props.fileDOM.querySelector(`Socket[Names*="${crane}"]`)
        let mainNames = mainSocket.getAttribute('Names').split(',').map(value => value.trim())
        mainNames = mainNames.filter(value => value !== crane)
        mainSocket.setAttribute('Names', mainNames.join(', '))

        this.props.fileDOM.querySelectorAll(`Socket[NamesBlock*="${crane}"]`).forEach(socket => {
            let namesBlock = socket.getAttribute('NamesBlock').split(',').map(value => value.trim())
            namesBlock = namesBlock.filter(value => value !== crane)
            socket.setAttribute('NamesBlock', namesBlock.join(', '))
        })
        this.props.fileDOM.querySelectorAll(`AddonsShift[Types*="${crane}"]`).forEach(shift => {
            shift.remove()
        })
        if (crane === Crane.RU) {
            this.setState({
                hasRUCrane: false
            })
        } else {
            this.setState({
                hasUSCrane: false
            })
        }
    }
}
