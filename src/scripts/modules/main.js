import renderer from '../service/RendererProcess.js'

const trucks = document.getElementById('trucks')
const trailers = document.getElementById('trailers')
const cargo = document.getElementById('cargo')

trucks.addEventListener('click', () => {
    localStorage.setItem('listType', 'trucks')
    renderer.call('openWindow', 'list')
})

trailers.addEventListener('click', () => {
    localStorage.setItem('listType', 'trailers')
    renderer.call('openWindow', 'list')
})

cargo.addEventListener('click', () => {
    localStorage.setItem('listType', 'cargo')
    renderer.call('openWindow', 'list')
})