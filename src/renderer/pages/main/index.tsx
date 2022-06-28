import { lazy, Suspense } from "react";

import Loading from "components/Loading";
import Page from "enums/Page";
import Window from "enums/Window";
import useWindowReady from "hooks/useWindowReady";
import { Provider } from "react-redux";
import { render } from "scripts/helpers";

import { selectPage } from "./store/pageSlice";
import store from "./store/store";
import { useMainSelector } from "./store/storeHooks";

const Lists = lazy(() => import("./lists"));
const Editor = lazy(() => import("./editor"));

const pages = {
    [Page.editor]: <Editor />,
    [Page.lists]: <Lists />
};

const Main = () => {
    useWindowReady(Window.Main);
    const currentPage = useMainSelector(selectPage);
    
    return (
        <Suspense fallback={<Loading />}>
            {pages[currentPage]}
        </Suspense>
    );
};

render(
    <Provider store={store}>
        <Main />
    </Provider>
);
