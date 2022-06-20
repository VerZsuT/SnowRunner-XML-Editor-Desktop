// Attributes
const DOWNLOAD = "download";
const LINK = "link";
const VERSION = "version";
const SOURCE_TYPE = "source_type";
const SOURCE = "source";

const GITHUB_SOURCE = "GitHub";

for (const $downloadButton of document.querySelectorAll(`button[${DOWNLOAD}]`)) {
    const $a = document.createElement("a");
    const version = $downloadButton.getAttribute(VERSION);
    const type = $downloadButton.getAttribute(SOURCE_TYPE);
    const source = $downloadButton.getAttribute(SOURCE);

    $a.style.display = "none";
    $downloadButton.prepend($a);

    if (source === GITHUB_SOURCE)
        $a.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor.${type}`;
    else
        $a.href = $downloadButton.getAttribute(LINK);

    $downloadButton.onclick = () => $a.click();
}
