import { memo, useCallback, useEffect, useState } from "react";

import { Modal, Spin, Button, Transfer } from "antd";
import globalTexts from "globalTexts/renderer";
import useConstFunc from "hooks/useConstFunc";
import config from "scripts/config";
import getPreload from "scripts/getPreload";
import type IConfigModsItems from "types/IConfigModsItems";
import type IListPreload from "types/IListPreload";

import texts from "../texts";

const { basename } = window.service;
const { findMods, getModPak } = getPreload<IListPreload>("listPreload");
const { MODS_POPUP_TITLE, MANUAL_MOD } = texts;
const { LOADING } = globalTexts;

interface IProps {
    hidePopup(reload?: boolean): void;
    show: boolean;
}

interface IItem {
    name: string;
    path: string;
}

const ModsPopup = (props: IProps) => {
    const { hidePopup: pHidePopup, show } = props;
    
    const [items, setItems] = useState<IItem[]>(null);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        if (show && !items) {
            setTimeout(() => {
                findMods().then(items => {
                    setItems(items);
                    setTargetKeys(getTargetKeys(items));
                });
            }, 100);
        }
    }, [show, items]);

    const hidePopup = useCallback(() => {
        setTargetKeys(getTargetKeys(items));
        pHidePopup();
    }, [pHidePopup, items]);

    const applyChanges = useCallback(() => {
        const length = targetKeys.length;
        const selected = KeysToModsItems(targetKeys, items);

        config.mods = {
            length,
            items: selected
        };
        pHidePopup(true);
    }, [pHidePopup, targetKeys, items]);

    const addManual = useCallback(() => {
        const result = getModPak();
        if (!result) return;

        for (const stateItem of items) {
            const stateName = stateItem.name;
            if (result.id === stateName)
                return;
        }

        setItems(prev => ([
            ...prev,
            {
                name: result.id,
                path: result.path
            }
        ]));
    }, [items]);

    const onChange = useConstFunc((nextTarget: string[]) => {
        setTargetKeys(nextTarget);
    });
    
    const onSelectChange = useConstFunc((source: string[], target: string[]) => {
        setSelectedKeys([...source, ...target]);
    });

    if (!show) return;

    return (
        <Modal
            className="mods-modal"
            title={items ? MODS_POPUP_TITLE : LOADING}
            onCancel={hidePopup}
            onOk={applyChanges}
            visible={show}
        >
            {items
                ? <>
                    <Transfer
                        dataSource={items.map(item => ({
                            key: item.path,
                            title: item.name
                        }))}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        targetKeys={targetKeys}
                        selectedKeys={selectedKeys}
                        titles={["Найдено", "Добавлено"]}
                        render={item => item.title}
                        className="mods-transfer"
                    />
                    <Button onClick={addManual} className="mods-manual-button">
                        {MANUAL_MOD}
                    </Button>
                </>
                : <Spin className="mods-spin" />
            }
        </Modal>
    );
};

function IItemToKeys(items: IItem[]): string[] {
    return items.map(item => item.path);
}

function KeysToModsItems(keys: string[], items: IItem[]): IConfigModsItems {
    const out: IConfigModsItems = {};

    keys.forEach(key => {
        Object.values(items).forEach(item => {
            if (item.path === key) {
                out[basename(item.path, ".pak")] = {
                    name: basename(item.path),
                    path: item.path
                };
            }
        });
    });

    return out;
}

function getTargetKeys(items: IItem[]) {
    const keys = IItemToKeys(items);

    return Object.values(config.mods.items)
        .filter(value => keys.includes(value.path))
        .map(value => value.path);
}

export default memo(ModsPopup);
