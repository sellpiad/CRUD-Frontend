import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

const initialState = {
    id: '',
    grantType: 'Bearer ',
    value: '',
    isLogined: false
}

export const accessToken = createSlice({
    name: 'accessToken',
    initialState,
    reducers : {
        changeToken(state, action){
            state.id = action.payload.id
            state.value = action.payload.value
            state.isLogined = true
        }
    },
    extraReducers: builder => {
        builder.addCase(PURGE, () => initialState)
    }
})

export const {changeToken, logout} = accessToken.actions

export default accessToken.reducer
