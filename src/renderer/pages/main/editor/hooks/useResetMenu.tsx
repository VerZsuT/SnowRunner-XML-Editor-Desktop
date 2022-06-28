import type { MouseEvent } from "react";

import globalTexts from "globalTexts/renderer";
import useContextMenu from "hooks/useContextMenu";

const { RESET_MENU_ITEM_LABEL } = globalTexts;

interface IResetMenuConfig {
    onClose?(): void;
    onReset?(): void;
    text?: string;
}

type FuncReturnType = [(e: MouseEvent<HTMLElement>)=>void, JSX.Element];

/**
 * Позволяет добавить сброс через контекстное меню.
 *
 * @returns [onContextMenu, ResetMenu]
 */
export default (config: IResetMenuConfig): FuncReturnType => {
    const {
        onClose = () => null,
        onReset = () => null,
        text = ""
    } = config;
    
    const {
        ContextMenu,
        onContextMenu,
        hideContextMenu
    } = useContextMenu();

    function onItemClick() {
        hideContextMenu();
        onReset();
    }
    
    const ResetContextMenu = (
        <ContextMenu
            onClose={onClose}
            items={[{
                label: `${RESET_MENU_ITEM_LABEL}${text ? ` "${text}"` : ""}`,
                key: "reset-menu-button",
                onClick: onItemClick
            }]}
        />
    );

    return [onContextMenu, ResetContextMenu];
};
