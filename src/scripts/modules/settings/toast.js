import {
    get
} from '../../service/funcs.js'

const $toast = get('#live-toast')

export default function toast(message) {
    $toast.querySelector('.toast-body').innerText = message
    $toast.style.opacity = '1'
    setTimeout(() => {
        $toast.style.opacity = '0'
    }, 2000)
}
