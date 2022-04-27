import WindowRoot from "components/WindowRoot";
import { createRoot } from "react-dom/client";
import { callback, MAIN } from "scripts/helpers";
import localize from "scripts/localize";
import config from "scripts/config";
import main from "scripts/main";

import VersionTitle from "./styled/VersionTitle";
import ButtonsGrid from "./styled/ButtonsGrid";
import Button from "./styled/Button";
import "styles/update";

const { on } = window.ipc;
const { update } = main;

interface IState {
    version: string
}

class UpdateWindow extends WindowRoot<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = { version: "" };
    }

    public override componentDidMount() {
        super.componentDidMount();
        this.listenIPC();
    }

    public render() {
        const { version } = this.state;

        return <> 
            <VersionTitle>
                {localize.ALLOW_NEW_VERSION_AUTO} (v{version})
            </VersionTitle>
            <ButtonsGrid>
                <Button color="success" onClick={this.update}>{localize.UPDATE}</Button>
                <Button color="error" onClick={this.ignore}>{localize.IGNORE}</Button>
                <Button color="primary" onClick={this.close}>{localize.CLOSE}</Button>
            </ButtonsGrid>
        </>;
    }

    @callback
    private close() {
        window.close();
    }

    @callback
    private update() {
        update();
    }

    @callback
    private ignore() {
        config.settings.updates = false;
        window.close();
    }

    private listenIPC() {
        on("content", (_event, data) => {
            this.setState({ version: data });
        });
    }
}

createRoot(MAIN).render(<UpdateWindow />);

export default UpdateWindow;
