const DOWNLOAD = 'download'
const LINK = 'link'
const VERSION = 'version'
const SOURCE_TYPE = 'source_type'
const SOURCE = 'source'
const LEGACY = 'legacy'

const GITHUB_SOURCE = 'GitHub'
const RELEASES_URL = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download'

function genLink(version, type, legacy) {
  return `${RELEASES_URL}/${version}/SnowRunnerXMLEditor${legacy ? '_legacy' : ''}.${type}`
}

const downloadButtons = document.querySelectorAll(`button[${DOWNLOAD}]`)

for (const downloadButton of downloadButtons) {
  const linkElement = document.createElement('a')
  const version = downloadButton.getAttribute(VERSION)
  const type = downloadButton.getAttribute(SOURCE_TYPE)
  const source = downloadButton.getAttribute(SOURCE)
  const legacy = downloadButton.getAttribute(LEGACY)

  linkElement.style.display = 'none'
  downloadButton.prepend(linkElement)

  if (source === GITHUB_SOURCE) {
    linkElement.href = genLink(version, type, legacy)
  } else {
    linkElement.href = downloadButton.getAttribute(LINK)
  }

  downloadButton.addEventListener('click', () => linkElement.click())
}
