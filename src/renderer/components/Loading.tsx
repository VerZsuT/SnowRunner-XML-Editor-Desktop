import { memo, useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import StyledBackdrop from "./styled/StyledBackdrop";

export let showLoading: () => void;

export default memo(() => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        initController();
    }, []);

    if (!isShow)
        return;

    return (
        <StyledBackdrop open={isShow}>
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    );

    function initController() {
        showLoading = () => {
            setIsShow(true);
        };
    }
});
