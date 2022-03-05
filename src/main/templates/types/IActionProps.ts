import type { CheerioAPI } from 'cheerio'
import type Editor from 'modules/editor/main'

/** Параметры сценария. */
interface IActionProps {
    /** DOM текущего открытого файла в таблице. */
    dom: CheerioAPI

    /** Instance класса редактора. */
    editor?: Editor
}

export default IActionProps
