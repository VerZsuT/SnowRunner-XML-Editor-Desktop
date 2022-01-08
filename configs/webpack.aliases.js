const {
    resolve: res
} = require('path')
const resolve = (...paths) => res(__dirname, ...paths)

module.exports = {
    'main': resolve('../src/main'),
    'menu': resolve('../src/renderer/scripts/menu'),
    'scripts': resolve('../src/renderer/scripts'),
    'templates': resolve('../src/main/templates'),
    'texts': resolve('../src/main/texts'),
    'bootstrap': resolve('../src/renderer/scripts/bootstrap.js'),
    'styles': resolve('../src/renderer/styles'),
    'images': resolve('../src/images'),
    'modules': resolve('../src/renderer/modules')
}
