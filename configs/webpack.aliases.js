const { join } = require('path')
const resolve = (...paths) => join(__dirname, ...paths)

module.exports = {
    'main': resolve('../src/main'),
    'menu': resolve('../src/renderer/scripts/menu'),
    'scripts': resolve('../src/renderer/scripts'),
    'templates': resolve('../src/main/templates'),
    'texts': resolve('../src/main/texts'),
    'styles': resolve('../src/renderer/styles'),
    'images': resolve('../src/images'),
    'modules': resolve('../src/renderer/modules')
}
