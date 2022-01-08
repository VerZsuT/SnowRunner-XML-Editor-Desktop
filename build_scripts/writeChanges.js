const {
    readFileSync,
    writeFileSync
} = require('fs')
const {
    join
} = require('path')
const {
    parseToNative,
    parseToWhatsNew,
    parseToGithub
} = require('./miniMarkdown.js')

const fileData = readFileSync(join(__dirname, 'changes.md')).toString()

async function writeOutput() {
    const downloadData = parseToNative(fileData, '\t\t\t')
    const whatsNewData = await parseToWhatsNew(fileData, '\t\t')
    const config = JSON.parse(readFileSync(join(__dirname, '../src/main/config.json')).toString())

    writeFileSync(join(__dirname, 'out', 'download.html'), `<div class='release'>\n\t<h2 class='title'>${config.version}</h2>\n\t<div class='description'>\n\t\t<ul>\n${downloadData}\n\t\t</ul>\n\t</div>\n\t<button\n\t\tclass='download btn btn-primary'\n\t\tversion='v${config.version}'\n\t\ttype='exe'\n\t\tsource='GitHub'\n\t>\n\t\tСкачать [GitHub]\n\t</button>\n\t<button\n\t\tclass='download btn btn-secondary'\n\t\tsource='GoogleDrive'\n\t\tlink='LINK_TO_DRIVE'\n\t>\n\t\tСкачать [GoogleDrive]\n\t</button>\n</div>`)
    writeFileSync(join(__dirname, 'out', 'whatsNew.html'), `<h1 className='title'>{t.WHATS_NEW_TITLE} v${config.version}</h1>\n<ol className='content'>\n${whatsNewData}</ol>`)
    writeFileSync(join(__dirname, 'out', 'github.md'), await parseToGithub(fileData))
}

if (process.argv[2] === '--force') {
    writeOutput()
}

module.exports = writeOutput
