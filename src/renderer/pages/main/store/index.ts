import { configureStore } from '@reduxjs/toolkit'

import { filterActions, filterReducer } from './filterSlice'
import { listActions, listReducer } from './listSlice'
import { pageActions, pageReducer } from './pageSlice'

export const store = configureStore({
  reducer: {
    page: pageReducer,
    filter: filterReducer,
    list: listReducer
  }
})

export const actions = { ...pageActions, ...listActions, ...filterActions }

export type MainState = ReturnType<typeof store.getState>
