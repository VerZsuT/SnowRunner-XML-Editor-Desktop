import './style.css';

const $progress = document.querySelector('#progress');
const $circular = document.querySelector('#circularG');
const $count = document.querySelector('#count');
const $fileName = document.querySelector('#file-name');

let count = null;

ipcRenderer.once('count', (_e, msg) => {
    count = msg;

    $count.innerText = `0/${count}`;
    $count.style.display = 'inline';
});

ipcRenderer.once('download', () => {
    $circular.style.display = 'none';
    $progress.style.display = 'block'
});

ipcRenderer.on('success', () => {
    $count.innerText = `${+$count.innerText.split('/')[0] + 1}/${count}`;
    $progress.value = 0;
});

ipcRenderer.on('fileName', (_e, msg) => {
    $fileName.innerText = msg;
    $fileName.style.display = 'block';
});

ipcRenderer.on('percent', (_event, message) => {
    $progress.value = message;
});
