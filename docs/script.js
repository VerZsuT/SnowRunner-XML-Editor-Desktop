for (const $downloadButton of document.querySelectorAll('.download')) {
    const a = document.createElement('a')
    const version = $downloadButton.getAttribute('version')
    a.style.display = 'none'
    $downloadButton.prepend(a)
    a.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor.rar`
    $downloadButton.onclick = () => a.click()
}
