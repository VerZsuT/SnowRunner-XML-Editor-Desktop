for (const $downloadButton of document.querySelectorAll('.download')) {
    const version = $downloadButton.getAttribute('version')
    let arch = 'x86'
    if (navigator && navigator.userAgent.includes('x64')) {
        arch = 'x64'
    }
    $downloadButton.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/win_${arch}.rar`
}