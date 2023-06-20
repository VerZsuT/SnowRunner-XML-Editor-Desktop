// Attributes
const DOWNLOAD = 'download'
const LINK = 'link'
const VERSION = 'version'
const SOURCE_TYPE = 'source_type'
const SOURCE = 'source'
const LEGACY = 'legacy'

const GITHUB_SOURCE = 'GitHub'
const RELEASES_URL = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download'

const genLink = (version, type, legacy) => `${RELEASES_URL}/${version}/SnowRunnerXMLEditor${legacy ? '_legacy' : ''}.${type}`

// Download buttons
const buttons = document.querySelectorAll(`button[${DOWNLOAD}]`)

buttons.forEach($button => {
  const $a = document.createElement('a')
  const version = $button.getAttribute(VERSION)
  const type = $button.getAttribute(SOURCE_TYPE)
  const source = $button.getAttribute(SOURCE)
  const legacy = $button.getAttribute(LEGACY)

  $a.style.display = 'none'
  $button.prepend($a)

  if (source === GITHUB_SOURCE)
    $a.href = genLink(version, type, legacy)
  else
    $a.href = $button.getAttribute(LINK)

  $button.addEventListener('click', () => $a.click())
})
