import { PureComponent } from "react";
import type { ReactNode } from "react";
import memoize from "memoizee";

import { Modal, Typography } from "@mui/material";
import PopupBox from "./styled/PopupBox";
import Container from "./styled/Container";

interface IState {
    show?: boolean
    title?: string
    onClose?(): void
    keepMounted?: boolean
    minWidth?: number
    minHeight?: number
    children: ReactNode
}

export let showPopup: (props: IState) => void;

class Popup extends PureComponent<{}, IState> {
    private styles = {
        title: {
            padding: 3,
            background: "#1c7dca",
            color: "white",
            borderTopRightRadius: "4px",
            borderTopLeftRadius: "4px",
            border: "none"
        },
        container: {
            padding: 10
        }
    };

    constructor(props: any) {
        super(props);
        this.state = { children: null };
        
        showPopup = props => {
            const { onClose } = props;

            this.setState({
                show: true,
                ...props,
                onClose: () => {
                    this.setState({ show: false });
                    if (onClose) 
                        onClose();
                }
            });
        };
    }

    public render() {
        const {
            onClose     = () => {},
            keepMounted = false,
            minWidth    = 300,
            minHeight   = 400,
            show        = false,
            title       = null,
            children    = null
        } = this.state;

        return (
            <Modal
                open={show}
                onClose={onClose}
                keepMounted={keepMounted}
            >
                <PopupBox style={this.getBoxStyle(minWidth, minHeight)}>
                    {title?
                        <Typography
                            variant="h6"
                            component="h2"
                            style={this.styles.title}
                        >
                            {title}
                        </Typography>
                    : null}
                    <Container style={this.styles.container}>
                        {children}
                    </Container>
                </PopupBox>
            </Modal>
        );
    }

    private getBoxStyle = memoize((minWidth: number, minHeight: number) => ({
        minWidth: minWidth,
        minHeight: minHeight,
        padding: 0
    }));
}

export default Popup;
