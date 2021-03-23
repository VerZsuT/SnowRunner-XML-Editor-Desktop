import MainProc from '../service/MainProc.js'

const trucks = document.getElementById('trucks')
const trailers = document.getElementById('trailers')
const cargo = document.getElementById('cargo')

const mainProc = new MainProc()

trucks.addEventListener('click', () => {
    localStorage.setItem('listType', 'trucks')
    mainProc.call('openWindow', 'list').catch(alert)
})

trailers.addEventListener('click', () => {
    localStorage.setItem('listType', 'trailers')
    mainProc.call('openWindow', 'list').catch(alert)
})

cargo.addEventListener('click', () => {
    localStorage.setItem('listType', 'cargo')
    mainProc.call('openWindow', 'list').catch(alert)
})