import { memo, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { Modal, Typography } from "@mui/material";
import IStyles from "types/IStyles";

import Container from "./styled/Container";
import PopupBox from "./styled/PopupBox";

interface PopupProps {
    show?: boolean;
    title?: string;
    onClose?(): void;
    keepMounted?: boolean;
    minWidth?: number;
    minHeight?: number;
    children?: ReactNode;
}

export let showPopup: (props: PopupProps) => void;

const styles: IStyles = {
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

export default memo(() => {
    const [state, setState] = useState<PopupProps>({});

    useEffect(() => {
        initController();
    }, []);

    const {
        onClose = () => null,
        keepMounted = false,
        minWidth = 300,
        minHeight = 400,
        show = false,
        title = null,
        children = null
    } = state;

    const boxStyle = useMemo(() => ({
        padding: 0,
        minWidth,
        minHeight
    }), [minWidth, minHeight]);

    return (
        <Modal
            open={show}
            onClose={onClose}
            keepMounted={keepMounted}
        >
            <PopupBox style={boxStyle}>
                {title
                    ? (
                        <Typography
                            variant="h6"
                            component="h2"
                            style={styles.title}
                        >
                            {title}
                        </Typography>
                    )
                    : null}
                <Container style={styles.container}>
                    {children}
                </Container>
            </PopupBox>
        </Modal>
    );

    function initController() {
        showPopup = args => {
            const { onClose } = args;

            setState({});
            setState({
                show: true,
                ...args,
                onClose() {
                    setState(prev => ({ ...prev, show: false }));
                    onClose?.call({});
                }
            });
        };
    }
});
