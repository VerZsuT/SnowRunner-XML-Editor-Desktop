import { lazy, useMemo, useState, useTransition } from "react";

import Page from "enums/Page";
import Window from "enums/Window";
import useConstFunc from "hooks/useConstFunc";
import useWindowReady from "hooks/useWindowReady";
import { render } from "scripts/helpers";

import RouterContext from "./RouterContext";

const Lists = lazy(() => import("pages/lists"));
const Editor = lazy(() => import("pages/editor"));

const routes = {
    [Page.editor]: <Editor />,
    [Page.lists]: <Lists />
};

const App = () => {
    const startTransition = useTransition()[1];
    const [currentRoute, setCurrentRoute] = useState(Page.lists);
    useWindowReady(Window.App);

    const route = useConstFunc(async (page: Page) => {
        startTransition(() => {
            setCurrentRoute(page);
        });
    });

    const context = useMemo(() => ({ route }), [route]);

    return (
        <RouterContext.Provider value={context}>
            {routes[currentRoute]}
        </RouterContext.Provider>
    );
};

render(<App />);
