import { memo, useState } from "react";
import type { CSSProperties } from "react";

import { Button, Modal } from "antd";
import Category from "enums/Category";
import SrcType from "enums/SrcType";
import useConstFunc from "hooks/useConstFunc";
import useOnMount from "hooks/useOnMount";
import { FixedSizeGrid } from "react-window";
import type { GridChildComponentProps } from "react-window";
import config from "scripts/config";
import main from "scripts/main";
import storage from "scripts/storage";
import { LIST_SCROLL } from "src/consts";
import type IItem from "types/IItem";

import { selectFilter } from "../../store/filterSlice";
import { selectFavorites } from "../../store/listSlice";
import { useMainSelector } from "../../store/storeHooks";
import texts from "../texts";
import ListItem from "./ListItem";
import ModsPopup from "./ModsPopup";

const { confirm } = Modal;
const { relaunchApp } = main;
const { settings } = config;
const { RELAUNCH_PROMPT, MODS_CHANGE_BUTTON } = texts;

interface IProps {
    srcType: SrcType;
    category: Category;
    items: IItem[];
    opened?: boolean;
}

const List = (props: IProps) => {
    const { items, srcType, opened, category } = props;
    const forceUpdate = useState<number>()[1];

    const filter = useMainSelector(selectFilter);
    const favorites = useMainSelector(selectFavorites);
    const [isShowMods, setIsShowMods] = useState(false);

    const id = `list-${srcType}`;
    const reloadPromptTimeout = 200;

    useOnMount(() => {
        window["onResize"](() => forceUpdate(Math.random()));
    }, window["removeResizers"]);

    const showModsPopup = useConstFunc(() => {
        setIsShowMods(true);
    });

    const hideModsPopup = useConstFunc((isReload?: boolean) => {
        setIsShowMods(false);
        if (isReload) {
            setTimeout(() => {
                confirm({
                    title: RELAUNCH_PROMPT,
                    onOk: () => relaunchApp()
                });
            }, reloadPromptTimeout); 
        }
    });

    if ((srcType === SrcType.mods && !settings.mods) ||
        (srcType === SrcType.dlc && !settings.DLC))
        return;

    let filteredItems = items;
    if (srcType === SrcType.favorites)
        filteredItems = items.filter(value => favorites.includes(value.name));

    if (filter)
        filteredItems = items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

    if (opened === false) return;

    const colWidth = 250;
    const rowHeight = 420;
    const gridHeight = window.innerHeight - (srcType === SrcType.mods? 230 : 210);
    const gridWidth = window.innerWidth;
    let colCount = Math.floor(window.innerWidth / colWidth);
    const rowCount = Math.ceil(filteredItems.length / colCount);

    if (filteredItems.length < colCount)
        colCount = filteredItems.length;

    const gutter = Math.round((gridWidth - (colCount * colWidth)) / (colCount + 1));

    return (
        <div className="list" id={id}>
            {srcType === SrcType.mods && <>
                <div>
                    <Button
                        type="primary"
                        className="mods-button"
                        onClick={showModsPopup}
                    >
                        {MODS_CHANGE_BUTTON}
                    </Button>
                </div>
                <ModsPopup
                    show={isShowMods}
                    hidePopup={hideModsPopup}
                />
            </>}
            <FixedSizeGrid
                initialScrollTop={parseInt(storage.pop(LIST_SCROLL) || "0")}
                className="card-list"
                columnCount={colCount}
                columnWidth={colWidth}
                height={gridHeight}
                width={gridWidth}
                rowHeight={rowHeight}
                rowCount={rowCount}
            >
                {(props: GridChildComponentProps, index: number) => (
                    <ItemRenderer
                        style={props.style}
                        columnIndex={props.columnIndex}
                        rowIndex={props.rowIndex}
                        gutter={gutter}
                        items={filteredItems}
                        category={category}
                        id={id}
                        colCount={colCount}
                        key={index}
                    />
                )}
            </FixedSizeGrid>
        </div>
    );
};

interface IItemProps {
    style: CSSProperties;
    rowIndex: number;
    columnIndex: number;
    items: IItem[];
    category: Category;
    id: string;
    gutter: number;
    colCount: number;
}

const ItemRenderer = memo((props: IItemProps) => {
    const { colCount, style, rowIndex, columnIndex, category, items, id, gutter } = props;
    const index = columnIndex + colCount * (rowIndex);

    if (items.length <= index) return;

    const item = items[index];

    return (
        <ListItem
            style={{
                ...style,
                top: style.top as number + 10,
                left: style.left as number + gutter * (columnIndex + 1)
            }}
            item={item}
            type={category}
            listId={id}
            modId={item.modId}
            dlc={item.dlcName}
        />
    );
});

export default memo(List);
