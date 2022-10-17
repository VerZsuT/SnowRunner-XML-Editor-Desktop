import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { OPENED_CATEGORY, OPENED_GROUP } from '#consts'
import { Category, GroupTab } from '#enums'
import { config, storage } from '#services'
import type { MainState } from './index'

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    group: storage.get<GroupTab>(OPENED_GROUP) ?? GroupTab.main,
    category: storage.get<Category>(OPENED_CATEGORY) ?? Category.trucks,
    favorites: config.favorites
  },
  reducers: {
    setGroup(state, action: PayloadAction<GroupTab>): void {
      state.group = action.payload
    },
    setCategory(state, action: PayloadAction<Category>): void {
      storage.set(OPENED_CATEGORY, action.payload)
      state.category = action.payload
    },
    toggleFavorite(state, action: PayloadAction<string>): void {
      const favorites = config.favorites
      const name = action.payload

      if (favorites.includes(name)) {
        config.favorites = favorites.filter(value => value !== name)
      }
      else {
        config.favorites = [...favorites, name]
      }

      state.favorites = config.favorites
    }
  }
})

export const listActions = listSlice.actions
export const selectGroup = (state: MainState) => state.list.group
export const selectCategory = (state: MainState) => state.list.category
export const selectFavorites = (state: MainState) => state.list.favorites

export const listReducer = listSlice.reducer
