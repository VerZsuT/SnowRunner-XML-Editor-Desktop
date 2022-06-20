import type { CheerioAPI } from "cheerio";

/** Параметры доп. сценария. */
interface IActionData {
    /** Название в меню. */
    name: string;

    /** Уникальный номер. */
    id: string | number;

    isActive(dom: CheerioAPI, fileName: string): boolean;

    /** Минимальная ширина popup'а. */
    minWidth?: number;

    /** Минимальная высота popup'а. */
    minHeight?: number;

    /** Картинка для кнопки в меню. */
    imgSRC?: string;
}

export default IActionData;
