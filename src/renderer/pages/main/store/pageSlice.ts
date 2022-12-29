import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { Page } from '#enums'
import type { MainState } from './index'

const pageSlice = createSlice({
  name: 'page',
  initialState: {
    current: Page.lists
  },
  reducers: {
    route(state, action: PayloadAction<Page>): void {
      state.current = action.payload
    }
  }
})

export const pageActions = pageSlice.actions
export const selectPage = (state: MainState) => state.page.current

export const pageReducer = pageSlice.reducer
