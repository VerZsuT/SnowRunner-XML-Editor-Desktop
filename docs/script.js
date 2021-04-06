for (const $downloadButton of document.querySelectorAll('.download')) {
    const version = $downloadButton.getAttribute('version')
    $downloadButton.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor_x86.rar`
}
