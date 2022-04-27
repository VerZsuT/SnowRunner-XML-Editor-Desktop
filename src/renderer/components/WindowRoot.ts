import { PureComponent } from "react";

const { send } = window.ipc;

class WindowRoot<P={}, S={}> extends PureComponent<P, S> {
    public componentDidMount() {
        send("window-ready");
    }
}

export default WindowRoot;
