import { FormEvent, PureComponent, createRef } from 'react'

import { setHotKey, mainProcess } from '@editor-service'
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
    private $input = createRef<HTMLInputElement>()

    state = {
        cmd: ''
    }

    componentDidMount() {
        setHotKey({
            key: 'Enter'
        }, () => {
            const params = this.state.cmd.split(' ')
            const cmd = params[0]
    
            if (this.props.listeners[cmd]) {
                const error = this.props.listeners[cmd](params.slice(1))
                if (error) this.props.onError(error)
            } else {
                this.props.onError(Message.warn(`Неверная команда '${cmd}'`))
            }
    
            this.setState({
                cmd: ''
            })
            this.$input.current.focus()
        })

        setHotKey({
            key: 'KeyI',
            ctrlKey: true,
            shiftKey: true
        }, () => {
            mainProcess.toggleDevTools()
        })

        document.addEventListener('click', () => {
            this.$input.current.focus()
        })
    }

    render() {
        return (
            <div className='line'>
                <AutoComplete cmd={this.state.cmd} onInput={this.onAutoInput}/>
                <span>:/ </span>
                <input
                    autoFocus={true}
                    type='text'
                    id='input'
                    value={this.state.cmd}
                    onInput={this.onInput}
                    placeholder='cmd'
                    ref={this.$input}
                />
            </div>
        )
    }

    private onInput = (e: FormEvent<HTMLInputElement>) => {
        this.setState({
            cmd: e.currentTarget.value
        })
    }

    private onAutoInput = (value: string) => {
        const params = this.state.cmd.split(' ')
        if (value.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== value) {
            params.pop()
        }
        params.push(value)
    
        if (params.length > 1) {
            this.setState({
                cmd: params.join(' ')
            })
        } else {
            this.setState({
                cmd: params[0]
            })
        }
        this.$input.current.focus()
    }
}
