import { useContext } from "react";
import type { CSSProperties } from "react";

import { StarFilled } from "@ant-design/icons";
import { Card, message } from "antd";
import type { CheerioAPI } from "cheerio";
import { load } from "cheerio";
import { showLoading } from "components/Loading";
import Category from "enums/Category";
import Page from "enums/Page";
import globalTexts from "globalTexts/renderer";
import useContextMenu from "hooks/useContextMenu";
import RouterContext from "renderer/RouterContext";
import config from "scripts/config";
import { getExported } from "scripts/dom";
import { getGameText, prettify } from "scripts/helpers";
import main from "scripts/main";
import storage from "scripts/storage";
import {
    FILE_PATH,
    CURRENT_DLC,
    CURRENT_MOD,
    OPENED_CATEGORY,
    OPENED_GROUP,
    LIST_SCROLL,
    DEBUG_IMAGES
} from "src/consts";
import type IItem from "types/IItem";

import ListContext from "../ListContext";
import texts from "../texts";

const { Meta } = Card;
const { existsSync, readFileSync, writeFileSync } = window.service;
const { openSaveDialog, paths } = main;
const { REMOVE_FAVORITE, ADD_FAVORITE } = texts;
const { EXPORT, SUCCESS_EXPORT_MESSAGE } = globalTexts;

interface IProps {
    item: IItem;
    type: Category;
    listId: string;
    modId: string;
    dlc: string;
    style: CSSProperties;
}

const ListItem = (props: IProps) => {
    const { item, type, listId, modId, dlc, style } = props;
    const { filter, toggleFavorite } = useContext(ListContext);
    const { route } = useContext(RouterContext);
    
    const fileDOM = getDOM(item.path);
    const name = getName(item, fileDOM);
    const imgSrc = getImgSrc(type, item, fileDOM);

    const show = isShow(name, filter);
    const title = getTitle(name, filter);
    const isFavorite = config.favorites.includes(item.name);
    
    const {
        hideContextMenu,
        onContextMenu,
        ContextMenu
    } = useContextMenu();

    function exportFile() {
        const exported = getExported(item.path, false, modId, dlc);
        const path = openSaveDialog(item.name);

        hideContextMenu();
        if (!path) return;

        writeFileSync(path, JSON.stringify(exported, null, "\t"));
        message.success(SUCCESS_EXPORT_MESSAGE);
    }

    function openEditor() {
        storage.set(FILE_PATH, item.path);
        storage.set(CURRENT_DLC, item.dlcName);
        storage.set(CURRENT_MOD, item.modId);
        storage.set(OPENED_CATEGORY, type);
        storage.set(OPENED_GROUP, listId.replace("list-", ""));
        storage.set(LIST_SCROLL, String(Math.round(document.querySelector(`#${listId} > .card-list`).scrollTop)));

        hideContextMenu();
        showLoading();
        route(Page.editor);
    }

    function toggle() {
        hideContextMenu();
        toggleFavorite(item.name);
    }

    if (!show) return;

    return <div style={{ position: "relative" }}>
        <Card
            style={style}
            className="card"
            hoverable
            cover={<img height={350} width={250} src={imgSrc} />}
            onContextMenu={onContextMenu}
            onClick={openEditor}
        >
            <Meta
                className="card-title"
                title={typeof title === "string"
                    ? title
                    : <>
                        {title.first}
                        <span className="red">
                            {title.second}
                        </span>
                        {title.last}
                    </>
                }
            />
            {isFavorite &&
                <StarFilled className="fav-star" />
            }
        </Card>
        <ContextMenu
            items={[
                {
                    label: isFavorite ? REMOVE_FAVORITE : ADD_FAVORITE,
                    key: "toggle-favorite",
                    onClick: toggle
                },
                {
                    label: EXPORT,
                    key: "export",
                    onClick: exportFile
                }
            ]}
            className="list-item-context"
        />
    </div>;
};

function isShow(name: string, filter: string) {
    if (!filter)
        return true;

    return name.toLowerCase().includes(filter.toLowerCase());
}

function getTitle(name: string, filter: string) {
    if (!filter)
        return name;

    const firstIndex = name.toLowerCase().indexOf(filter.toLowerCase());
    const lastIndex = firstIndex + filter.length;

    return {
        first: name.slice(0, firstIndex),
        second: name.slice(firstIndex, lastIndex),
        last: name.slice(lastIndex, name.length)
    };
}

function getImgSrc(category: Category, item: IItem, fileDOM: CheerioAPI) {
    switch (category) {
    case Category.trailers:
        try {
            return require(`images/trailers/${item.name}.png`);
        }
        catch {
            return require("images/trailers/default.png");
        }
    case Category.trucks:
        try {
            return require(`images/trucks/${item.name}.jpg`);
        }
        catch {
            const defaultImage = require("images/trucks/default.png");
            if (DEBUG_IMAGES)
                console.warn(`Не найдена картинка ${item.name}`);

            if (item.modId && fileDOM("GameData > UiDesc").length) {
                const imgName = fileDOM("GameData > UiDesc").attr("UiIcon328x458");
                const truckPath = `${paths.modsTemp}/${item.modId}/ui/textures/${imgName}.png`;

                if (!existsSync(truckPath))
                    return defaultImage;
                
                return truckPath;
            }
            return defaultImage;
        }
    }
}

function getDOM(path: string) {
    return load(readFileSync(path), { xmlMode: true });
}

function getName(item: IItem, fileDOM: CheerioAPI) {
    let name = prettify(item.name);

    if (fileDOM("GameData > UiDesc").length) {
        const uiName = fileDOM("GameData > UiDesc").attr("UiName");
        if (uiName)
            name = getGameText(uiName, item.modId) || uiName;
    }
    return name;
}

export default ListItem;
