import type { CheerioAPI } from "cheerio";
import type IActionRunProps from "types/IActionRunProps";

/** Параметры сценария. */
interface IActionProps {
    /** DOM текущего открытого файла в таблице. */
    dom: CheerioAPI;

    /** Instance класса редактора. */
    runProps?: IActionRunProps;
}

export default IActionProps;
