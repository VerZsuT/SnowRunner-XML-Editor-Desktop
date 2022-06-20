import { memo } from "react";

import { FileFilled, FolderFilled } from "@ant-design/icons";
import { Button } from "antd";
import getPreload from "scripts/getPreload";
import type IFolder from "types/IFolder";

import texts from "../texts";

const { GAME_FOLDER_LABEL } = texts;
const preload = getPreload<IGameDataProvider>();

interface IGameDataProvider {
    getInitial(): IFolder;
    getGameFolder(): IFolder;
}

interface IProps {
    onChange(path: string): void;
}

export default memo((props: IProps) => {
    const { onChange } = props;

    function getPak() {
        const data = preload.getInitial();
        if (!data) return;

        data.folder = data.initial;

        onChange(data.initial);
    }

    function getFolder() {
        const data = preload.getGameFolder();
        if (!data) return;

        onChange(data.initial);
    }

    return <div className="game-folder">
        <Button
            type="primary"
            icon={<FolderFilled />}
            size="large"
            onClick={getFolder}
            style={{ marginRight: "30px" }}
        >
            {GAME_FOLDER_LABEL}
        </Button>
        <Button
            type="primary"
            icon={<FileFilled />}
            size="large"
            onClick={getPak}
        >
            initial.pak
        </Button>
    </div>;
});
