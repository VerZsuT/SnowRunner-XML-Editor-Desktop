for (const $downloadButton of document.querySelectorAll("button[download]")) {
    const $a = document.createElement("a");
    const version = $downloadButton.getAttribute("version");
    const type    = $downloadButton.getAttribute("source_type");
    const source  = $downloadButton.getAttribute("source");

    $a.style.display = "none";
    $downloadButton.prepend($a);

    if (source === "GitHub")
        $a.href = `https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop/releases/download/${version}/SnowRunnerXMLEditor.${(type==="exe")?"exe":"rar"}`;
    else
        $a.href = $downloadButton.getAttribute("link");

    $downloadButton.onclick = () => $a.click();
}
