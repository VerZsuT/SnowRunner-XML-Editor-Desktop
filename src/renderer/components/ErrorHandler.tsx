import { PureComponent } from "react";

import { Snackbar } from "@mui/material";
import Alert from "./styled/Alert";

interface IState {
    isOpen: boolean
    message: string
}

class ErrorHandler extends PureComponent<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            message: ""
        };
    }
    
    public componentDidMount() {
        window["errorHandler"] = this.errorHandler;
    }

    public render() {
        const { isOpen, message } = this.state;

        return (
            <Snackbar
                open={isOpen}
                autoHideDuration={6000}
                onClose={this.onClose}
            >
                <Alert onClose={this.onClose} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        );
    }

    private errorHandler = (error: string) => {
        this.setState({
            isOpen: true,
            message: error
        });
    };

    private onClose = () => {
        this.setState({ isOpen: false });
    };
}

export default ErrorHandler;