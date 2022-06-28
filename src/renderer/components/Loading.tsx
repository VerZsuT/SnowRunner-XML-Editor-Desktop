import { memo } from "react";

import { CircularProgress } from "@mui/material";

import StyledBackdrop from "./styled/StyledBackdrop";

export let showLoading: () => void;

export default memo(() => {
    return (
        <StyledBackdrop open={true}>
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    );
});
