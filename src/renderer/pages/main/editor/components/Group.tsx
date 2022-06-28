import { memo, useCallback, useState } from "react";

import { TableBody } from "@mui/material";
import GroupAccordion from "components/GroupAccordion";
import InputType from "enums/InputType";
import useConst from "hooks/useConst";
import useConstFunc from "hooks/useConstFunc";
import memoizee from "memoizee";
import type IGroupParams from "types/IGroupParams";
import type IInputParams from "types/IInputParams";
import type ISelectParams from "types/ISelectParams";
import type ITemplateParams from "types/ITemplateParams";

import Parameter from "../components/Parameter";
import useId from "../hooks/useId";
import useReset from "../hooks/useReset";
import useResetMenu from "../hooks/useResetMenu";
import Table from "../styled/Table";


interface IProps {
    item: IGroupParams;
    registerReset?(id: string, func: () => void): void;
    unregisterReset?(id: string): void;
    toggle(expand: boolean): void;
    parentExportEnabled: boolean;
    isExportMode: boolean;
    show: boolean;
    open: boolean;
}

interface IGroupItems {
    groups: ITemplateParams;
    params: {
        files: IInputParams[];
        default: (IInputParams & ISelectParams)[];
    };
}

interface IResetList {
    [id: string]: () => void;
}

const emptyContStyle = {
    height: "47px"
};

const Group = memo((props: IProps) => {
    const {
        item,
        open,
        show,
        toggle,
        registerReset,
        unregisterReset,
        parentExportEnabled,
        isExportMode
    } = props;
    const id = useId();

    const iconSRC = useConst<string>(() => item.iconName? require(`images/icons/editor/${item.iconName}`) : null);
    const items = useConst<IGroupItems>(() => getItems(item));
    const resetList = useConst<IResetList>({});

    const [exportEnabled, setExportEnabled] = useState(parentExportEnabled);
    const [openedGroup, setOpenedGroup] = useState<number>(null);

    const toggleExpand = memoizee(
        (index: number) => (expand: boolean) => setOpenedGroup(expand ? index : null)
    );

    const [onContextMenu, ResetMenu] = useResetMenu({
        text: item.groupName,
        onReset: reset
    });

    useReset({
        id,
        register: registerReset,
        unregister: unregisterReset,
        callback: reset
    });

    const registerResetC = useConstFunc((id: string, func: () => void) => {
        resetList[id] = func;
    });
    const unregisterResetC = useConstFunc((id: string) => {
        delete resetList[id];
    });

    const toggleExport = useCallback(() => {
        if (parentExportEnabled)
            setExportEnabled(prev => !prev);
    }, [parentExportEnabled]);

    const defaultParams = items.params.default.map((param, index) => (
        <Parameter
            parentExportEnabled={exportEnabled && parentExportEnabled}
            exportMode={isExportMode}
            item={param}
            registerReset={registerResetC}
            key={`${param.selector}-${index}`}
            unregisterReset={unregisterResetC}
            show={open}
        />
    ));
    const filesParams = items.params.files.map((param, index) => (
        <Parameter
            item={param as unknown as IInputParams & ISelectParams}
            key={`${param.selector}-${index}`}
            registerReset={registerResetC}
            unregisterReset={unregisterResetC}
            parentExportEnabled={exportEnabled && parentExportEnabled}
            exportMode={isExportMode}
            show={open}
        />
    ));
    const groups = items.groups.map((groupItem, index) => (
        <Group
            item={groupItem}
            key={`${groupItem.groupName}-${index}`}
            registerReset={registerResetC}
            unregisterReset={unregisterResetC}
            parentExportEnabled={exportEnabled && parentExportEnabled}
            isExportMode={isExportMode}
            show={open}
            open={openedGroup === index}
            toggle={toggleExpand(index)}
        />
    ));

    if (show === false) {
        return (
            <div style={emptyContStyle}>
                {defaultParams}
                {filesParams}
                {groups}
            </div>
        );
    }

    return <>
        {ResetMenu}
        <GroupAccordion
            id={id}
            title={item.groupName}
            iconSRC={iconSRC}
            showExport={isExportMode}
            isExport={exportEnabled && parentExportEnabled}
            onChangeExport={toggleExport}
            onContextMenu={onContextMenu}
            onChange={toggle}
            expanded={open}
        >
            {!!defaultParams.length &&
                <Table>
                    <TableBody>
                        {defaultParams}
                    </TableBody>
                </Table>
            }
            {filesParams}
            {groups}
        </GroupAccordion>
    </>;

    function reset() {
        for (const itemID in resetList)
            resetList[itemID]();
    }
});

function getItems(item: IGroupParams) {
    const groups: ITemplateParams = [];
    const files: (IInputParams)[] = [];
    const defaultItems: (IInputParams & ISelectParams)[] = [];

    const params = {
        default: defaultItems,
        files
    };

    for (const groupItem of item.groupItems) {
        if (groupItem.paramType === "group")
            groups.push(groupItem);
        else if (groupItem.type === InputType.file)
            params.files.push(groupItem);
        else
            params.default.push(groupItem);
    }

    return { groups, params };
}

export default Group;
