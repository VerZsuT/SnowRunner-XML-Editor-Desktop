import mainProcess from '../../service/mainProcess.js';
import AutoComplete from './AutoComplete.js';
import Message from './Message.js';

const $input = document.querySelector('#input');

export default class EditorConsole {
    static #listeners = {};

    static init() {
        $input.focus();
        document.addEventListener('keypress', event => {
            if (event.code === 'Enter') {
                const params = $input.value.split(' ');
                const cmd = params[0];

                if (this.#listeners[cmd]) {
                    this.#listeners[cmd](params.slice(1));
                } else {
                    Message.warn(`Неверная команда '${cmd}'`);
                }
        
                $input.value = '';
                AutoComplete.reset();
            } else if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
                mainProcess.openDevTools();
            }
        })
    }

    static onCmd(cmd, listener) {
        this.#listeners[cmd] = listener;
    }
}
