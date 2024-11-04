import { utils } from '@/utils/utils'
import { store } from './store'

export type IReduxStatus = 'idle' | 'loading' | 'fulfilled' | 'failed'

const types = utils.CONST.USER.NUMERIC_TYPES

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type IUserTypeNumeric = keyof typeof types

export interface IReduxInitialKeyState {
  status: IReduxStatus
  message: string | null
}

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  address: string | null
  type: IUserTypeNumeric
  profilePicture: string | null
  organizationName?: string
}

export interface IInitialUserSliceState extends IReduxInitialKeyState {
  data: {
    user: IUser | null
  }
}
