declare const SETUP_WEBPACK_ENTRY: string;
declare const LOADING_WEBPACK_ENTRY: string;
declare const SETTINGS_WEBPACK_ENTRY: string;
declare const UPDATE_WEBPACK_ENTRY: string;
declare const WHATS_NEW_WEBPACK_ENTRY: string;
declare const MAIN_WEBPACK_ENTRY: string;

declare const SETUP_PRELOAD_WEBPACK_ENTRY: string;
declare const SETTINGS_PRELOAD_WEBPACK_ENTRY: string;
declare const MAIN_PRELOAD_WEBPACK_ENTRY: string;
declare const LOADING_PRELOAD_WEBPACK_ENTRY: string;
declare const WHATS_NEW_PRELOAD_WEBPACK_ENTRY: string;
declare const UPDATE_PRELOAD_WEBPACK_ENTRY: string;

const ROOT_PRELOAD = require.resolve("scripts/rootPreload");

export default {
    rootPreload: ROOT_PRELOAD,
    setup: SETUP_WEBPACK_ENTRY,
    loading: LOADING_WEBPACK_ENTRY,
    settings: SETTINGS_WEBPACK_ENTRY,
    update: UPDATE_WEBPACK_ENTRY,
    whatsNew: WHATS_NEW_WEBPACK_ENTRY,
    main: MAIN_WEBPACK_ENTRY,

    setupPreload: SETUP_PRELOAD_WEBPACK_ENTRY,
    settingsPreload: SETTINGS_PRELOAD_WEBPACK_ENTRY,
    mainPreload: MAIN_PRELOAD_WEBPACK_ENTRY,
    loadingPreload: LOADING_PRELOAD_WEBPACK_ENTRY,
    whatsNewPreload: WHATS_NEW_PRELOAD_WEBPACK_ENTRY,
    updatePreload: UPDATE_PRELOAD_WEBPACK_ENTRY
};
