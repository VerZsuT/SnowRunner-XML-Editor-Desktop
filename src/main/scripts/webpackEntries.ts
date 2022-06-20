declare const CONSOLE_WEBPACK_ENTRY: string;
declare const SETUP_WEBPACK_ENTRY: string;
declare const LOADING_WEBPACK_ENTRY: string;
declare const SETTINGS_WEBPACK_ENTRY: string;
declare const UPDATE_WEBPACK_ENTRY: string;
declare const WHATS_NEW_WEBPACK_ENTRY: string;
declare const APP_WEBPACK_ENTRY: string;

declare const CONSOLE_PRELOAD_WEBPACK_ENTRY: string;
declare const SETUP_PRELOAD_WEBPACK_ENTRY: string;
declare const SETTINGS_PRELOAD_WEBPACK_ENTRY: string;
declare const APP_PRELOAD_WEBPACK_ENTRY: string;
declare const LOADING_PRELOAD_WEBPACK_ENTRY: string;
declare const WHATS_NEW_PRELOAD_WEBPACK_ENTRY: string;
declare const UPDATE_PRELOAD_WEBPACK_ENTRY: string;

const MAIN_PRELOAD = require.resolve("scripts/mainPreload");

export default {
    mainPreload: MAIN_PRELOAD,
    console: CONSOLE_WEBPACK_ENTRY,
    setup: SETUP_WEBPACK_ENTRY,
    loading: LOADING_WEBPACK_ENTRY,
    settings: SETTINGS_WEBPACK_ENTRY,
    update: UPDATE_WEBPACK_ENTRY,
    whatsNew: WHATS_NEW_WEBPACK_ENTRY,
    app: APP_WEBPACK_ENTRY,

    consolePreload: CONSOLE_PRELOAD_WEBPACK_ENTRY,
    setupPreload: SETUP_PRELOAD_WEBPACK_ENTRY,
    settingsPreload: SETTINGS_PRELOAD_WEBPACK_ENTRY,
    appPreload: APP_PRELOAD_WEBPACK_ENTRY,
    loadingPreload: LOADING_PRELOAD_WEBPACK_ENTRY,
    whatsNewPreload: WHATS_NEW_PRELOAD_WEBPACK_ENTRY,
    updatePreload: UPDATE_PRELOAD_WEBPACK_ENTRY
};
