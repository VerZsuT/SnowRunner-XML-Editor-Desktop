import { memo } from "react";

import { ApiOutlined, AppstoreAddOutlined, AppstoreOutlined, StarFilled } from "@ant-design/icons";
import { Tabs } from "antd";
import { load } from "cheerio";
import Header from "components/Header";
import Menu from "components/Menu";
import Category from "enums/Category";
import GroupTab from "enums/GroupTab";
import SrcType from "enums/SrcType";
import Window from "enums/Window";
import useHandleKey from "hooks/useHandleKey";
import useIPCMessage from "hooks/useIPCMessage";
import useLayoutOnMount from "hooks/useLayoutOnMount";
import useStaticMemo from "hooks/useStaticMemo";
import config from "scripts/config";
import getPreload from "scripts/getPreload";
import main from "scripts/main";
import type IItem from "types/IItem";
import type IListPreload from "types/IListPreload";

import { selectCategory, selectGroup, setCategory, setGroup } from "../store/listSlice";
import { useMainDispatch, useMainSelector } from "../store/storeHooks";
import List from "./components/List";
import Search from "./components/Search";
import texts from "./texts";

import "./style.scss";

const { settings } = config;
const { TabPane } = Tabs;
const { getList } = getPreload<IListPreload>("listPreload");
const { readFileSync } = window.service;
const { quitApp, openWindow } = main;

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

export default memo(() => {
    const dispatch = useMainDispatch();
    const activeCategory = useMainSelector(selectCategory);
    const activeGroup = useMainSelector(selectGroup);
    
    const mods = useStaticMemo(() => getMods(activeCategory), [activeCategory]);
    const main = useStaticMemo(() => getMain(activeCategory), [activeCategory]);
    const dlc = useStaticMemo(() => getDLC(activeCategory), [activeCategory]);
    const allItems = useStaticMemo(() => [...mods, ...main, ...dlc], [activeCategory]);
    
    useHandleKeys();
    useIPCMessage();

    useLayoutOnMount(() => {
        if (config.settings.showWhatsNew)
            openWhatsNew();
    });

    return <>
        <Menu />

        <Header
            text={activeCategory === Category.trucks ? TRUCKS_LIST_TITLE : TRAILERS_LIST_TITLE}
            extra={<Search />}
        />
        <Tabs className="tabs"
            activeKey={activeCategory}
            onChange={category => dispatch(setCategory(category as Category))}
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
            onChange={tab => dispatch(setGroup(tab as GroupTab))}
        >
            <TabPane
                tab={<span>
                    <AppstoreOutlined className="tab-icon" />
                    {MAIN_LIST_TITLE}
                </span>}
                key={GroupTab.main}
            />
            <TabPane
                tab={<span>
                    <AppstoreAddOutlined className="tab-icon" />
                    {DLC_LIST_TITLE}
                </span>}
                disabled={!settings.DLC}
                key={GroupTab.dlc}
            />
            <TabPane
                tab={<span>
                    <ApiOutlined className="tab-icon" />
                    {MODS_LIST_TITLE}
                </span>}
                disabled={!settings.mods}
                key={GroupTab.mods}
            />
            <TabPane
                tab={<span>
                    <StarFilled className="tab-icon" />
                    {FAVORITES_LIST_TITLE}
                </span>}
                key={GroupTab.favorites}
            />
        </Tabs>

        <List
            srcType={SrcType.main}
            items={main}
            opened={activeGroup === GroupTab.main}
            category={activeCategory}
        />
        <List
            srcType={SrcType.favorites}
            items={allItems}
            opened={activeGroup === GroupTab.favorites}
            category={activeCategory}
        />

        {!!settings.DLC &&
            <List
                srcType={SrcType.dlc}
                items={dlc}
                opened={activeGroup === GroupTab.dlc}
                category={activeCategory}
            />
        }
        {!!settings.mods &&
            <List
                srcType={SrcType.mods}
                items={mods}
                opened={activeGroup === GroupTab.mods}
                category={activeCategory}
            />
        }
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
        key: "Escape"
    }, () => quitApp());
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
