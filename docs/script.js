for (const $downloadButton of document.querySelectorAll('.download')) {
    const a = document.createElement('a');
    const version = $downloadButton.getAttribute('version');
    const type = $downloadButton.getAttribute('type');
    a.style.display = 'none';
    $downloadButton.prepend(a);
    a.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor.${(type==='exe')?'exe':'rar'}`;
    $downloadButton.onclick = () => a.click();
}
