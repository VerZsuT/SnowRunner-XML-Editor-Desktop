import { get } from '../../service'
import './style.css'

const $progress = get<HTMLProgressElement>('#progress')
const $circular = get<HTMLDivElement>('#circularG')
const $count = get<HTMLParagraphElement>('#count')
const $fileName = get<HTMLDivElement>('#file-name')

let count: number

ipcRenderer.once('count', (_e, msg) => {
    count = msg

    $count.innerText = `0/${count}`
    $count.style.display = 'inline'
})

ipcRenderer.once('download', () => {
    $circular.style.display = 'none'
    $progress.style.display = 'block'
})

ipcRenderer.on('success', () => {
    $count.innerText = `${+$count.innerText.split('/')[0] + 1}/${count}`
    $progress.value = 0
})

ipcRenderer.on('fileName', (_e, msg) => {
    $fileName.innerText = msg
    $fileName.style.display = 'block'
})

ipcRenderer.on('percent', (_event, message) => {
    $progress.value = message
})
