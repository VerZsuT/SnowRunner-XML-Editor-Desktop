declare const SETUP_WEBPACK_ENTRY: string
declare const LOADING_WEBPACK_ENTRY: string
declare const SETTINGS_WEBPACK_ENTRY: string
declare const UPDATE_WEBPACK_ENTRY: string
declare const WHATSNEW_WEBPACK_ENTRY: string
declare const MAIN_WEBPACK_ENTRY: string

declare const SETUP_PRELOAD_WEBPACK_ENTRY: string
declare const SETTINGS_PRELOAD_WEBPACK_ENTRY: string
declare const MAIN_PRELOAD_WEBPACK_ENTRY: string
declare const LOADING_PRELOAD_WEBPACK_ENTRY: string
declare const WHATSNEW_PRELOAD_WEBPACK_ENTRY: string
declare const UPDATE_PRELOAD_WEBPACK_ENTRY: string

class Entries {
  readonly general = {
    setup: SETUP_WEBPACK_ENTRY,
    loading: LOADING_WEBPACK_ENTRY,
    settings: SETTINGS_WEBPACK_ENTRY,
    update: UPDATE_WEBPACK_ENTRY,
    whatsNew: WHATSNEW_WEBPACK_ENTRY,
    main: MAIN_WEBPACK_ENTRY
  }

  readonly preload = {
    setup: SETUP_PRELOAD_WEBPACK_ENTRY,
    settings: SETTINGS_PRELOAD_WEBPACK_ENTRY,
    main: MAIN_PRELOAD_WEBPACK_ENTRY,
    loading: LOADING_PRELOAD_WEBPACK_ENTRY,
    whatsNew: WHATSNEW_PRELOAD_WEBPACK_ENTRY,
    update: UPDATE_PRELOAD_WEBPACK_ENTRY
  }
}

export const entries = new Entries()
