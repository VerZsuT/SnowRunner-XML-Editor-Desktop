const { resolve } = require('path')

module.exports = {
    '@editor-app': resolve(__dirname, '../src/app'),
    '@editor-service': resolve(__dirname, '../src/scripts/service'),
    '@editor-templates': resolve(__dirname, '../src/scripts/templates'),
    '@editor-texts': resolve(__dirname, '../src/scripts/texts'),
    '@editor-bootstrap': resolve(__dirname, '../src/scripts/bootstrap/bootstrap.bundle.min.js')
}
