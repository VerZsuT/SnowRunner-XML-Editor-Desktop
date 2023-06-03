import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { OPENED_CATEGORY, OPENED_GROUP } from '#g/consts'
import { Category, GroupTab } from '#g/enums'
import { Config, Storage } from '#r/services'
import type { MainState } from './index'

const listSlice = createSlice({
  name: 'list',
  initialState: {
    group: Storage.get<GroupTab>(OPENED_GROUP) ?? GroupTab.main,
    category: Storage.get<Category>(OPENED_CATEGORY) ?? Category.trucks,
    favorites: Config.favorites
  },
  reducers: {
    setGroup(state, action: PayloadAction<GroupTab>): void {
      state.group = action.payload
    },
    setCategory(state, action: PayloadAction<Category>): void {
      Storage.set(OPENED_CATEGORY, action.payload)
      state.category = action.payload
    },
    toggleFavorite(state, action: PayloadAction<string>): void {
      const favorites = Config.favorites
      const name = action.payload

      if (favorites.includes(name)) {
        Config.favorites = favorites.filter(value => value !== name)
      }
      else {
        Config.favorites = [...favorites, name]
      }

      state.favorites = Config.favorites
    }
  }
})

export const listActions = listSlice.actions
export const selectGroup = (state: MainState) => state.list.group
export const selectCategory = (state: MainState) => state.list.category
export const selectFavorites = (state: MainState) => state.list.favorites

export const listReducer = listSlice.reducer
