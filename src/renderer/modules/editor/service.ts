import { get, mainProcess, t } from 'scripts'

const { join, basename } = window.editorPreload
const { paths } = window.provider
const { readFile, templates: mainTemplates, getParams } = mainProcess

const parser = new DOMParser()
const serializer = new XMLSerializer()

export function getGlobalTemplates() {
    const filePath = join(paths.mainTemp, '[media]', '_templates', 'trucks.xml')
    const fileData = readFile(filePath)

    return parser.parseFromString(fileData, 'text/xml')
}

export function getDOM(filePath: string): [Document, ITemplateParams] {
    const fileData = readFile(filePath)
    if (!fileData) return

    const parser = new DOMParser()
    const $dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml')
    if ($dom.querySelector('parsererror')) {
        const error = get<HTMLDivElement>('#error')
        error.innerText = t[error.innerText]
        error.style.display = 'block'
        throw new Error('[RECOGNIZE_ERROR]')
    }

    const $root = $dom.querySelector('root')
    $root.childNodes.forEach(child => {
        if (child.nodeType === 8) {
            child.remove()
        }
    })

    if ($root.childNodes[0].nodeValue === '\n') {
        $root.childNodes[0].remove()
    }

    const tempDOM = $dom
    const templates = mainTemplates
    let name: string
    for (const tmp in templates) {
        const selector = `root > ${templates[tmp].selector}`
        if (selector && tempDOM.querySelector(selector)) {
            name = tmp
            break
        }
    }
    const domString = serializer.serializeToString(tempDOM)
    const result = getParams(domString, name, basename(filePath, '.xml'))

    return [parser.parseFromString(result.dom, 'application/xml'), result.params]
}
