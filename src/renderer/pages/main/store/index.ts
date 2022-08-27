import {configureStore} from '@reduxjs/toolkit'

import {filterReducer} from './filterSlice'
import {listReducer} from './listSlice'
import {pageReducer} from './pageSlice'

export const store = configureStore({
    reducer: {
        page: pageReducer,
        filter: filterReducer,
        list: listReducer
    }
})

export type MainState = ReturnType<typeof store.getState>
export type MainDispatch = typeof store.dispatch
