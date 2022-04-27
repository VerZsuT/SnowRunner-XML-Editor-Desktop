import { PureComponent } from "react";
import localize from "scripts/localize";
import Lang from "main/enums/Lang";
import config from "scripts/config";
import main from "scripts/main";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Container from "./styled/Container";
import Label from "./styled/Label";

const { reload } = main;

class Language extends PureComponent {
    private langOptions: JSX.Element[];

    constructor(props: any) {
        super(props);
        this.langOptions = Object.keys(Lang).map(lang =>
            <MenuItem key={lang} value={lang}>
                {lang}
            </MenuItem>
        );
    }

    public render() {
        return (
            <Container>
                <Label id="lang-label">
                    {localize.LANGUAGE_MENU_ITEM_LABEL}
                </Label>
                <Select
                    labelId="lang-label"
                    onChange={this.changeLang}
                    value={config.lang}
                    variant="standard"
                >
                    {this.langOptions}
                </Select>
            </Container>
        );
    }

    private changeLang = (event: SelectChangeEvent) => {
        config.lang = event.target.value as Lang;
        reload();
    };
}

export default Language;
