import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { MainState } from './index'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: ''
  },
  reducers: {
    changeFilter(state, action: PayloadAction<string>): void {
      state.value = action.payload
    }
  }
})

export const filterActions = filterSlice.actions
export const selectFilter = (state: MainState) => state.filter.value

export const filterReducer = filterSlice.reducer
