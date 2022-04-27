import { PureComponent } from "react";
import localize from "scripts/localize";
import { callback } from "scripts/helpers";
import config from "scripts/config";
import main from "scripts/main";

import { Button } from "@mui/material";
import Container from "components/styled/Container";

const { saveBackup } = main;

interface IProps {
    pathToInitial: string
}

class Save extends PureComponent<IProps> {
    public render() {
        return (
            <Container>
                <Button
                    className="not-upper"
                    variant="contained"
                    onClick={this.save}
                >
                    {localize.SAVE_BUTTON}
                </Button>
            </Container>
        );
    }

    @callback
    private save() {
        const { pathToInitial } = this.props;

        if (!pathToInitial) {
            window["errorHandler"](localize.NO_GAME_FOLDER);
            return;
        }

        config.initial = pathToInitial;
        saveBackup(true);
    }
}

export default Save;
