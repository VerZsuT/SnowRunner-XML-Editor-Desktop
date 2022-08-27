const { join } = require('path')
const resolve = (...paths) => join(__dirname, ...paths)

const src = (path = '') => resolve(`../../src${path}`)
const main = (path = '') => src(`/main${path}`)
const renderer = (path = '') => src(`/renderer${path}`)

module.exports = {
    main: main(),
    consts: src('/types/consts'),
    types: src('/types'),
    globalTexts: src('/globalTexts'),
    enums: src('/enums'),
    images: src('/images'),
    renderer: renderer(),
    templates: renderer('/templates'),
    scripts: renderer('/scripts'),
    pages: renderer('/pages'),
    components: renderer('/components'),
    helpers: renderer('/helpers'),
    hooks: renderer('/hooks'),
    src: src()
}
