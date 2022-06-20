import { memo, useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { Typography } from "@mui/material";
import useOnMount from "hooks/useOnMount";

import Popup, { showPopup } from "./Popup";
import Grid from "./styled/Grid";
import texts from "./texts";

const { DROP_TEXT } = texts;

interface IProps {
    onDrop(files: FileList): void;
}

const gridStyle: CSSProperties = {
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    height: "100px"
};

export default memo((props: IProps) => {
    const { onDrop } = props;
    const [isShow, setIsShow] = useState(false);

    useOnMount(handleDrop);

    useEffect(() => {
        showPopup({
            show: isShow,
            minHeight: 100,
            minWidth: 200,
            children: <Grid style={gridStyle}>
                <Typography>{DROP_TEXT}</Typography>
            </Grid>
        });
    });

    return <Popup />;

    function handleDrop() {
        let counter = 0;

        document.addEventListener("drop", event => {
            event.preventDefault();
            event.stopPropagation();

            onDrop(event.dataTransfer.files);
            setIsShow(false);
            counter = 0;
        });
        document.addEventListener("dragover", event => {
            event.preventDefault();
        });
        document.addEventListener("dragenter", () => {
            ++counter;
            if (counter === 1)
                setIsShow(true);
        });
        document.addEventListener("dragleave", () => {
            --counter;
            if (counter === 0)
                setIsShow(false);
        });
    }
});
