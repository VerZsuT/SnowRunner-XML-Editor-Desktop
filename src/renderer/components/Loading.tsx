import { PureComponent } from "react";

import { CircularProgress } from "@mui/material";
import StyledBackdrop from "./styled/StyledBackdrop";

interface IState {
    show: boolean
}

export let showLoading: () => void;

class Loading extends PureComponent<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = { show: false };
        showLoading = () => {
            this.setState({ show: true });
        };
    }

    public render() {
        const { show=false } = this.state;

        if (!show)
            return null;
        
        return (
            <StyledBackdrop open={show}>
                <CircularProgress color="inherit"/>
            </StyledBackdrop>
        );
    }
}

export default Loading;
