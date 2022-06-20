const { join } = require("path");
const resolve = (...paths) => join(__dirname, ...paths);

const src = "../src";
const main = `${src}/main`;
const renderer = `${src}/renderer`;

module.exports = {
    main: resolve(main),
    types: resolve(`${src}/types`),
    globalTexts: resolve(`${src}/globalTexts`),
    enums: resolve(`${src}/enums`),
    images: resolve(`${src}/images`),
    renderer: resolve(renderer),
    templates: resolve(`${renderer}/templates`),
    scripts: resolve(`${renderer}/scripts`),
    pages: resolve(`${renderer}/pages`),
    components: resolve(`${renderer}/components`),
    hooks: resolve(`${renderer}/hooks`),
    src: resolve(src)
};
