for (const $downloadButton of document.querySelectorAll('.download')) {
    const $a = document.createElement('a');
    const version = $downloadButton.getAttribute('version');
    const type = $downloadButton.getAttribute('type');
    const source = $downloadButton.getAttribute('source');
    $a.style.display = 'none';
    $downloadButton.prepend($a);
    if (source === 'GitHub') {
        $a.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor.${(type==='exe')?'exe':'rar'}`;
    } else if (source === 'GoogleDrive') {
        $a.href = $downloadButton.getAttribute('link');
    }
    $downloadButton.onclick = () => $a.click();
}
