const { resolve } = require('path')

module.exports = {
    '@sxmle-app': resolve(__dirname, '../src/app'),
    '@sxmle-service': resolve(__dirname, '../src/scripts/service'),
    '@sxmle-templates': resolve(__dirname, '../src/scripts/templates'),
    '@sxmle-texts': resolve(__dirname, '../src/scripts/texts'),
    '@sxmle-bootstrap': resolve(__dirname, '../src/scripts/bootstrap/bootstrap.bundle.min.js'),
    '@sxmle-main-style': resolve(__dirname, '../src/styles/main'),
    '@sxmle-images': resolve(__dirname, '../src/images')
}
