import WindowRoot from "components/WindowRoot";
import { createRoot } from "react-dom/client";
import ListType from "modules/list/enums/ListType";

import Menu from "menu";
import { setHotKey, MAIN } from "scripts/helpers";
import main from "scripts/main";
import config from "scripts/config";
import Category from "./components/Category";
import Loading from "components/Loading";

import Grid from "./styled/Grid";
import "styles/categories";

const { openWindow, quit } = main;

class Categories extends WindowRoot {
    private items: JSX.Element[];

    constructor(props: any) {
        super(props);
        const categories = this.getCategories();
        this.items = categories.map(category =>
            <Category key={category} name={category} />
        );
    }

    public override componentDidMount() {
        super.componentDidMount();
        this.setHotkeys();
        this.openWhatsNew();
    }

    public render() {
        return <>
            <Loading />
            <Menu />
            <Grid>
                {this.items}
            </Grid>
        </>;
    }

    private openWhatsNew() {
        if (config.settings.showWhatsNew) {
            openWindow("WhatsNew");
            config.settings.showWhatsNew = false;
        }        
    }

    private getCategories() {
        return Object.keys(ListType) as ListType[];
    }

    private setHotkeys() {
        setHotKey({
            key: "Backquote"
        }, () => openWindow("Console"));
        setHotKey({
            key: "Escape",
            eventName: "keydown"
        }, () => quit());
    }
}

createRoot(MAIN).render(<Categories />);
