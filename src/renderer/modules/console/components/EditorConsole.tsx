import { FormEvent, PureComponent } from 'react'
import { setHotKey } from 'scripts/funcs'
import main from 'scripts/main'
import { Message } from '../service'
import AutoComplete from './AutoComplete'

interface IProps {
    listeners: {
        [name: string]: (args: string[]) => void | JSX.Element
    }
    onError(error: JSX.Element): void
}

interface IState {
    cmd: string
}

/** Класс консоли программы. */
export default class EditorConsole extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            cmd: ''
        }
    }

    componentDidMount() {
        this.setEnterHotkey()
    }

    render() {
        return (
            <div className='line'>
                <AutoComplete cmd={this.state.cmd} onInput={this.onAutoInput} />
                <span>:/ </span>
                <input
                    autoFocus
                    id='input'
                    value={this.state.cmd}
                    onInput={this.onInput}
                    placeholder='cmd'
                />
            </div>
        )
    }

    private onInput = (e: FormEvent<HTMLInputElement>) => {
        this.setState({ cmd: e.currentTarget.value })
    }

    private setEnterHotkey() {
        setHotKey({
            key: 'Enter'
        }, () => {
            const params = this.state.cmd.split(' ')
            const cmd = params[0]

            if (this.props.listeners[cmd]) {
                const error = this.props.listeners[cmd](params.slice(1))
                if (error)
                    this.props.onError(error)
            }
            else {
                this.props.onError(Message.warn(`Неверная команда '${cmd}'`))
            }

            this.setState({ cmd: '' });
            (document.querySelector('#input') as HTMLInputElement).focus()
        })
    }

    private onAutoInput = (value: string) => {
        const params = this.state.cmd.split(' ')

        if (value.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== value)
            params.pop()
        params.push(value)

        if (params.length > 1)
            this.setState({ cmd: params.join(' ') })
        else
            this.setState({ cmd: params[0] });

        (document.querySelector('#input') as HTMLInputElement).focus()
    }
}
