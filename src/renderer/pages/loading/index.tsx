import { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Typography, Progress } from "antd";
import Window from "enums/Window";
import globalTexts from "globalTexts/renderer";
import useWindowReady from "hooks/useWindowReady";
import { render } from "scripts/helpers";

import "./style.scss";

const { Title, Text } = Typography;
const { on } = window.ipc;
const { LOADING } = globalTexts;

const Loading = () => {
    useWindowReady(Window.Loading);

    const [loadedCount, setLoadedCount] = useState(0);
    const [isDownload, setIsDownload] = useState(false);
    const [allCount, setAllCount] = useState(0);
    const [percent, setPercent] = useState(0);
    const [title, setTitle] = useState(LOADING);

    useEffect(initController, []);

    return (
        <div className="main">
            <Title className="title" level={4}>
                {title}
            </Title>

            {isDownload
                ? <>
                    <Progress percent={percent} />
                    <div className="grid info">
                        <Text>
                            {loadedCount} / {allCount}
                        </Text>
                    </div>
                </>
                : <Spin
                    className="spin"
                    indicator={<LoadingOutlined className="spin-icon" spin />}
                />
            }
        </div>
    );

    function initController() {
        on("download", () => setIsDownload(true));
        on("success", () => {
            setPercent(0);
            setLoadedCount(prev => prev + 1);
        });
        on("fileName", (_, msg) => setTitle(msg));
        on("percent", (_, msg) => setPercent(+msg));
        on("count", (_, msg) => setAllCount(+msg));
    }
};

render(<Loading />);
