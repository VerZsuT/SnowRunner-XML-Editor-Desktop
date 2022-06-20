import type { CheerioAPI } from "cheerio";

interface IItem {
    selector: string;
}

export function addTag(fileDOM: CheerioAPI, item: IItem) {
    if (!fileDOM(item.selector).length) {
        const array = item.selector.split(">").map(value => value.trim());
        const name = array.pop();
        const rootSelector = array.join(" > ");

        fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`);
    }
}
