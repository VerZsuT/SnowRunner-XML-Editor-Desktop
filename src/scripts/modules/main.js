import DataTunnel from '../service/DataTunnel.js'

const trucks = document.getElementById('trucks')
const trailers = document.getElementById('trailers')
const cargo = document.getElementById('cargo')

const dataTunnel = new DataTunnel()

trucks.addEventListener('click', () => {
    localStorage.setItem('listType', 'trucks')
    dataTunnel.invoke('openWindow', 'list')
})

trailers.addEventListener('click', () => {
    localStorage.setItem('listType', 'trailers')
    dataTunnel.invoke('openWindow', 'list')
})

cargo.addEventListener('click', () => {
    localStorage.setItem('listType', 'cargo')
    dataTunnel.invoke('openWindow', 'list')
})