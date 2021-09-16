const $messages = document.querySelector('#messages');

export default class Message {
    static log(text) {
        this.#message(text);
    }

    static warn(text) {
        this.#message(text, 'warn');
    }

    static error(text) {
        this.#message(text, 'error');
    }

    static info(text) {
        this.#message(text, 'info');
    }

    static #message(text, type=null) {
        const el = document.createElement('p');
        el.innerText = `> ${text}`;

        switch (type) {
            case 'warn':
                el.style.color = 'yellow';
                break;
            case 'error':
                el.style.color = 'red';
                break;
            case 'info':
                el.style.color = 'lightblue';
        }

        $messages.append(el);
        document.scrollingElement.scrollBy(0, 1000);
    }
}
