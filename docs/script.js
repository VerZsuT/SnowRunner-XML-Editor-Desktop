// Attributes
const DOWNLOAD = 'download'
const LINK = 'link'
const VERSION = 'version'
const SOURCE_TYPE = 'source_type'
const SOURCE = 'source'

const GITHUB_SOURCE = 'GitHub'
const RELEASES_URL = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download'

const downloadButtons = document.querySelectorAll(`button[${DOWNLOAD}]`)

downloadButtons.forEach($downloadButton => {
    const $a = document.createElement('a')
    const version = $downloadButton.getAttribute(VERSION)
    const type = $downloadButton.getAttribute(SOURCE_TYPE)
    const source = $downloadButton.getAttribute(SOURCE)

    $a.style.display = 'none'
    $downloadButton.prepend($a)

    if (source === GITHUB_SOURCE)
        $a.href = `${RELEASES_URL}/${version}/SnowRunnerXMLEditor.${type}`
    else
        $a.href = $downloadButton.getAttribute(LINK)

    $downloadButton.onclick = () => $a.click()
})
