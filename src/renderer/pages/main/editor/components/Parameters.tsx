import { Fragment, memo, useContext, useState } from "react";

import ParamType from "enums/ParamType";
import memoizee from "memoizee";

import MainContext from "../MainContext";
import Group from "./Group";
import Parameter from "./Parameter";

interface IProps {
    exportMode: boolean;
    registerReset?(id: string, func: () => void): void;
    unregisterReset?(id: string): void;
    show?: boolean;
}

export default memo((props: IProps) => {
    const {
        registerReset,
        unregisterReset,
        exportMode,
        show
    } = props;
    const { tableItems } = useContext(MainContext);

    const [openedGroup, setOpenedGroup] = useState<number>(null);

    const toggleExpand = memoizee(
        (index: number) => (expand: boolean) => setOpenedGroup(expand ? index : null)
    );

    return <>{tableItems.map((item, index) => (
        <Fragment key={item.selector}>
            {item.paramType === ParamType.group && !!item.groupItems.length &&
                <Group
                    item={item}
                    registerReset={registerReset}
                    unregisterReset={unregisterReset}
                    toggle={toggleExpand(index)}
                    isExportMode={exportMode}
                    parentExportEnabled
                    show={show}
                    open={openedGroup === index}
                />
            }
            {item.paramType !== ParamType.group &&
                <Parameter
                    item={item}
                    registerReset={registerReset}
                    unregisterReset={unregisterReset}
                    parentExportEnabled
                    exportMode={exportMode}
                    show={show}
                />
            }
        </Fragment>
    ))}</>;
});
