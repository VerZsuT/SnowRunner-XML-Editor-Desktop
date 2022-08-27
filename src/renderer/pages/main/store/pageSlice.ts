import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Page} from 'enums'

import type {MainState} from './index'

interface PageState {
    current: Page
}

const initialState: PageState = {
    current: Page.lists
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        route: (state, action: PayloadAction<Page>) => {
            state.current = action.payload
        }
    }
})

export const { route } = pageSlice.actions
export const selectPage = (state: MainState) => state.page.current

export const pageReducer = pageSlice.reducer
