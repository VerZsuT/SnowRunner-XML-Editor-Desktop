import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {OPENED_CATEGORY, OPENED_GROUP} from 'consts'
import {Category, GroupTab} from 'enums'
import {config} from 'scripts/config'
import {storage} from 'scripts/storage'

import type {MainState} from './index'

interface ListState {
    group: GroupTab
    category: Category
    favorites: string[]
}

const initialState: ListState = {
    group: storage.get(OPENED_GROUP) ?? GroupTab.main,
    category: storage.get(OPENED_CATEGORY) ?? Category.trucks,
    favorites: config.favorites
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setGroup: (state, action: PayloadAction<GroupTab>) => {
            state.group = action.payload
        },
        setCategory: (state, action: PayloadAction<Category>) => {
            storage.set(OPENED_CATEGORY, action.payload)
            state.category = action.payload
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const favorites = config.favorites
            const name = action.payload

            if (favorites.includes(name))
                config.favorites = favorites.filter(value => value !== name)
            else
                config.favorites = [...favorites, name]

            state.favorites = config.favorites
        }
    }
})

export const { setCategory, setGroup, toggleFavorite } = listSlice.actions
export const selectGroup = (state: MainState) => state.list.group
export const selectCategory = (state: MainState) => state.list.category
export const selectFavorites = (state: MainState) => state.list.favorites

export const listReducer = listSlice.reducer
