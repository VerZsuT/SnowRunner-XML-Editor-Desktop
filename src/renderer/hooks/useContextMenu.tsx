import { memo, useState } from "react";
import type { MouseEvent } from "react";

import { Menu } from "antd";
import type { MenuProps } from "antd";

import useConstFunc from "./useConstFunc";
import useMemo from "./useMemo";

interface IReturns {
    hideContextMenu(): void;
    showContextMenu(): void;
    onContextMenu(e: MouseEvent<HTMLElement>): void;
    ContextMenu: (props: IContextMenuProps) => JSX.Element;
}

interface IContextMenuProps {
    items: MenuProps["items"];
    onClose?(): void;
    className?: string;
}

export default (): IReturns => {
    const [isShow, setIsShow] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const position = useMemo(() => ({
        top: y,
        left: x
    }), [x, y]);

    const onContextMenu = useConstFunc((e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setX(e.clientX);
        setY(e.clientY);
        setIsShow(true);
    });

    const ContextMenu = memo((props: IContextMenuProps) => {
        const { items, onClose, className = "" } = props;

        function onAreaClick() {
            setIsShow(false);
            onClose && onClose();
        }

        return (
            <div
                className={`context ${className}`}
                style={{ display: isShow ? "block" : "none" }}
                onClick={onAreaClick}
            >
                <Menu
                    className="context-menu"
                    style={{
                        top: position.top,
                        left: position.left
                    }}
                    items={items}
                />
            </div>
        );
    });

    return {
        ContextMenu,
        onContextMenu,
        hideContextMenu,
        showContextMenu
    };

    function hideContextMenu() {
        setIsShow(false);
    }

    function showContextMenu() {
        setIsShow(true);
    }
};
