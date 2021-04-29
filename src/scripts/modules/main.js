import '../bootstrap/bootstrap.bundle.min.js'
import '../service/menu.js'
import '../service/translate.js'

import { get } from '../service/funcs.js'
import { funcs } from '../service/renderer.js'

const trucks = get('#trucks')
const trailers = get('#trailers')
const cargo = get('#cargo')

trucks.addEventListener('click', () => {
    local.listType =  'trucks'
    funcs.openList()
})

trailers.addEventListener('click', () => {
    local.listType = 'trailers'
    funcs.openList()
})

cargo.addEventListener('click', () => {
    local.listType = 'cargo'
    funcs.openList()
})