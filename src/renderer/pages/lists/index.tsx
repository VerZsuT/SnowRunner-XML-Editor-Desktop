import { memo, useCallback, useLayoutEffect, useState } from "react";

import { ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled } from "@ant-design/icons";
import { Tabs } from "antd";
import { load } from "cheerio";
import Header from "components/Header";
import Loading from "components/Loading";
import Menu from "components/Menu";
import Category from "enums/Category";
import SrcType from "enums/SrcType";
import Window from "enums/Window";
import useConstFunc from "hooks/useConstFunc";
import useHandleKey from "hooks/useHandleKey";
import useIPCMessage from "hooks/useIPCMessage";
import useMemo from "hooks/useMemo";
import config from "scripts/config";
import getPreload from "scripts/getPreload";
import main from "scripts/main";
import storage from "scripts/storage";
import { OPENED_CATEGORY, OPENED_GROUP } from "src/consts";
import type IItem from "types/IItem";
import type IListPreload from "types/IListPreload";

import List from "./components/List";
import Search from "./components/Search";
import ListContext from "./ListContext";
import texts from "./texts";

import "./style.scss";

const { settings } = config;
const { TabPane } = Tabs;
const { getList } = getPreload<IListPreload>("listPreload");
const { readFileSync } = window.service;
const { quit, openWindow } = main;

const {
    TRUCKS_LIST_TITLE,
    TRAILERS_LIST_TITLE,
    MAIN_LIST_TITLE,
    DLC_LIST_TITLE,
    MODS_LIST_TITLE,
    FAVORITES_LIST_TITLE,
    TRAILERS_CATEGORY_TITLE,
    TRUCKS_CATEGORY_TITLE
} = texts;

enum TabType {
    main = "main",
    dlc = "dlc",
    mods = "mods",
    favorites = "favorites",
}

export default memo(() => {
    const [activeCategory, setActiveCategory] = useState(getActiveCategory);
    
    const mods = useMemo(() => getMods(activeCategory), [activeCategory]);
    const main = useMemo(() => getMain(activeCategory), [activeCategory]);
    const dlc = useMemo(() => getDLC(activeCategory), [activeCategory]);
    
    const [activeGroup, setActiveGroup] = useState(getActiveGroup);
    const [favorites, setFavorites] = useState(() => getFavorites(mods, main, dlc));
    const [filter, setFilter] = useState("");

    useHandleKeys();
    useIPCMessage();

    useLayoutEffect(() => {
        openWhatsNew();
    }, []);

    const onGroupChange = useConstFunc((value: any) => {
        setActiveGroup(value);
    });

    const onCategoryChange = useConstFunc((value: any) => {
        storage.set(OPENED_CATEGORY, value);
        setActiveCategory(value);
        setFavorites(getFavorites(getMods(value), getMain(value), getDLC(value)));
    });

    const onFilterChange = useConstFunc((value: string) => {
        setFilter(value);
    });

    const toggleFavorite = useCallback((name: string) => {
        const favorites = config.favorites;

        if (favorites.includes(name))
            config.favorites = favorites.filter(value => value !== name);
        else
            config.favorites = [...favorites, name];

        setFavorites(getFavorites(mods, main, dlc));
    }, [mods, main, dlc]);

    const context = useMemo(() => ({
        filter, toggleFavorite
    }), [filter, toggleFavorite]);

    return <>
        <Menu />
        <Loading />

        <Header
            text={activeCategory === Category.trucks ? TRUCKS_LIST_TITLE : TRAILERS_LIST_TITLE}
            extra={<Search value={filter} onChange={onFilterChange} />}
        />
        <Tabs className="tabs"
            activeKey={activeCategory}
            onChange={onCategoryChange}
        >
            <TabPane
                tab={<span>{TRUCKS_CATEGORY_TITLE}</span>}
                key={Category.trucks}
            />
            <TabPane
                tab={<span>{TRAILERS_CATEGORY_TITLE}</span>}
                key={Category.trailers}
            />
        </Tabs>
        <Tabs className="tabs"
            activeKey={activeGroup}
            onChange={onGroupChange}
        >
            <TabPane
                tab={<span>
                    <AppstoreOutlined className="tab-icon" />
                    {MAIN_LIST_TITLE}
                </span>}
                key={TabType.main}
            />
            <TabPane
                tab={<span>
                    <AppstoreAddOutlined className="tab-icon" />
                    {DLC_LIST_TITLE}
                </span>}
                disabled={!settings.DLC}
                key={TabType.dlc}
            />
            <TabPane
                tab={<span>
                    <ApiOutlined className="tab-icon" />
                    {MODS_LIST_TITLE}
                </span>}
                disabled={!settings.mods}
                key={TabType.mods}
            />
            <TabPane
                tab={<span>
                    <StarFilled className="tab-icon" />
                    {FAVORITES_LIST_TITLE}
                </span>}
                key={TabType.favorites}
            />
        </Tabs>

        <ListContext.Provider value={context}>
            <List
                srcType={SrcType.main}
                items={main}
                opened={activeGroup === TabType.main}
                category={activeCategory}
            />
            <List
                srcType={SrcType.favorites}
                items={favorites}
                opened={activeGroup === TabType.favorites}
                category={activeCategory}
            />

            {!!settings.DLC &&
                <List
                    srcType={SrcType.dlc}
                    items={dlc}
                    opened={activeGroup === TabType.dlc}
                    category={activeCategory}
                />
            }
            {!!settings.mods &&
                <List
                    srcType={SrcType.mods}
                    items={mods}
                    opened={activeGroup === TabType.mods}
                    category={activeCategory}
                />
            }
        </ListContext.Provider>
    </>;
});

function openWhatsNew() {
    if (settings.showWhatsNew) {
        openWindow(Window.WhatsNew);
        settings.showWhatsNew = false;
    }
}

function useHandleKeys() {
    useHandleKey({
        key: "Backquote"
    }, () => openWindow(Window.Console));
    useHandleKey({
        key: "Escape"
    }, () => quit());
}

function getFavorites(mods: IItem[], main: IItem[], dlc: IItem[]) {
    const allItems = [...main, ...mods, ...dlc];
    return allItems.filter(value => config.favorites.includes(value.name));
}

function getMain(category: Category) {
    const array = getList(category, SrcType.main);

    return array.map(value => {
        if (category !== Category.trucks)
            return value;

        const fileData = readFileSync(value.path);
        const dom = load(fileData, { xmlMode: true });
        const $Truck = dom("Truck");

        if (!$Truck.length)
            return value;

        if ($Truck.attr("Type") !== "Trailer")
            return value;
    }).filter(value => !!value);
}

function filterByCategory(array: IItem[], category: Category): IItem[] {
    return array.map(value => {
        const fileData = readFileSync(value.path);
        const $dom = load(fileData, { xmlMode: true });
        const $Truck = $dom("Truck");

        if (!$Truck.length) return;

        if (category === Category.trailers && $Truck.attr("Type") === "Trailer")
            return value;

        if (category === Category.trucks && $Truck.attr("Type") !== "Trailer")
            return value;
    }).filter(value => !!value);
}

function getDLC(category: Category) {
    const newArray: IItem[] = [];

    if (!settings.DLC)
        return [];
  
    const array = getList(category, SrcType.dlc);
    for (const dlc of array) {
        for (const item of dlc.items) {
            newArray.push({
                ...item,
                dlcName: dlc.dlcName
            });
        }
    }
  
    return filterByCategory(newArray, category);
}

function getMods(category: Category) {
    const newArray: IItem[] = [];

    if (!settings.mods)
        return [];

    const array = getList(category, SrcType.mods);
    for (const mod of array) {
        for (const item of mod.items) {
            newArray.push({
                ...item,
                modId: mod.id
            });
        }
    }
  
    return filterByCategory(newArray, category);
}

function getActiveCategory(): Category {
    return storage.get(OPENED_CATEGORY) ?? Category.trucks;
}

function getActiveGroup(): TabType {
    return storage.get(OPENED_GROUP) ?? TabType.main;
}
