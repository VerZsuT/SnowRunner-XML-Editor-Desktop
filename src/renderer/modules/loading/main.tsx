import WindowRoot from "components/WindowRoot";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { MAIN } from "scripts/helpers";
import ToTest from "components/ToTest";

import { Typography, CircularProgress } from "@mui/material";
import Container from "components/styled/Container";
import GridContainer from "components/styled/GridContainer";
import LinearProgress from "./styled/LinearProgress";
import "styles/loading";

const { on } = window.ipc;

interface IState {
    allCount: number
    loadedCount: number
    percent: number
    isDownload: boolean
    name: string
}

class Loading extends WindowRoot<any, IState> {
    private styles = {
        mainCont: {
            textAlign: "center"
        } as CSSProperties,
        gridCont: {
            justifyContent: "center"
        },
        percent: {
            marginLeft: "10px"
        },
        progress: {
            marginTop: "15px"
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            allCount: 0,
            loadedCount: 0,
            percent: 0,
            isDownload: false,
            name: ""
        };
    }

    public override componentDidMount() {
        super.componentDidMount();
        this.listenIPC();
    }

    public render() {
        const { name, isDownload, percent, allCount, loadedCount } = this.state;

        return (
            <Container style={this.styles.mainCont}>
                <ToTest text="loading-page"/>
                <Container>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                </Container>

                {isDownload 
                    ? <>
                        <LinearProgress
                            variant="determinate"
                            value={percent}
                        />
                        <GridContainer style={this.styles.gridCont}>
                            <Typography variant="body2">
                                {loadedCount}/{allCount}
                            </Typography>
                            <Typography variant="body2" style={this.styles.percent}>
                                {Math.round(percent)}%
                            </Typography>
                        </GridContainer>
                    </>
                    : <CircularProgress style={this.styles.progress}/>
                }
            </Container>
        );
    }

    private listenIPC() {
        on("count", (_e, msg) => {
            this.setState({ allCount: +msg })
        });
        on("download", () => {
            this.setState({ isDownload: true })
        });
        on("success", () => {
            this.setState(({ loadedCount }) => ({
                percent: 0,
                loadedCount: loadedCount + 1
            }));
        });
        on("fileName", (_e, msg) => {
            this.setState({ name: msg });
        });
        on("percent", (_event, msg) => {
            this.setState({ percent: +msg });
        });
    }
}

createRoot(MAIN).render(<Loading />);
