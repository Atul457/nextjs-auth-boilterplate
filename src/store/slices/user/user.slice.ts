import { createSlice } from '@reduxjs/toolkit'
import { USER_CONST } from './user.const'
import { userThunks } from './user.thunk'
import { utils } from '@/utils/utils'
import { IUser, RootState } from '@/store/types'

const userSlice = createSlice({
  name: 'user',
  initialState: USER_CONST.initialState,
  reducers: {
    resetUser: state => {
      state.data.user = null
    },
    updateUser: (
      state,
      {
        payload
      }: {
        payload: { [K in keyof IUser]?: IUser[K] }
      }
    ) => {
      if (state.data.user) {
        state.data.user = {
          ...state.data.user,
          ...payload
        }
      } else {
        state.data.user = payload as any
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(userThunks.get.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(userThunks.get.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled'
      state.data.user = payload
    })
    builder.addCase(userThunks.get.rejected, (state, { payload }) => {
      state.message = (payload as any)?.message ?? utils.CONST.RESPONSE_MESSAGES.SOMETHING_WENT_WRONG
      state.status = 'failed'
    })
  }
})

const userSelectors = {
  user: (state: RootState) => state.user.data.user,
  isAdminLoggedIn: (state: RootState) => {
    const user = state.user.data.user
    const type = user?.type
    if (type) {
      return type === utils.CONST.USER.TYPES.ADMIN
    }
    return null
  },
  isSignedIn: (state: RootState) => !!state.user.data.user,
  userStatus: (state: RootState) => state.user.status
}

export { userSelectors }
export const user = userSlice.reducer
export const userActions = userSlice.actions
